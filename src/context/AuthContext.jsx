import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../ApolloClient'; // Importuojame sukonfigūruotą Apollo Client
import { CURRENT_USER_QUERY } from '../graphql/queries'; // Reikės sukurti šią užklausą

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken')); // Skaitome token'ą
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [loading, setLoading] = useState(true); // Pradinio krovimo būsena
    const navigate = useNavigate();

    // Funkcija vartotojo duomenims gauti pagal token'ą
    const fetchCurrentUser = useCallback(async () => {
        const currentToken = localStorage.getItem('authToken'); // Patikriname naujausią token'ą
        if (!currentToken) {
            setLoading(false);
            return; // Nieko nedarome, jei tokeno nėra
        }

        console.log("AuthContext: Fetching current user...");
        try {
            // Naudojame Apollo Client tiesiogiai čia (galima, nes jis sukonfigūruotas)
            // Naudojame fetchPolicy 'network-only', kad neimtų iš kešo, jei vartotojas pasikeitė
            const { data, error } = await client.query({
                query: CURRENT_USER_QUERY,
                fetchPolicy: 'network-only'
            });

            if (error) {
                // Jei klaida (pvz., tokenas nebegalioja), išvalome autentifikaciją
                console.error("AuthContext: Error fetching current user:", error.message);
                logout(); // Naudojam logout funkciją viskam išvalyti
            } else if (data?.currentUser) {
                console.log("AuthContext: Current user fetched:", data.currentUser);
                setUser(data.currentUser); // Nustatome gautus vartotojo duomenis
                setIsAuthenticated(true); // Užtikriname, kad autentifikuotas
                setToken(currentToken); // Užtikriname, kad token state'as atitinka localStorage
            } else {
                // Jei query pavyko, bet negavome user (neturėtų nutikti su validžiu tokenu)
                 console.warn("AuthContext: currentUser query succeeded but returned no user.");
                 logout();
            }
        } catch (err) {
            // Kitokios klaidos
            console.error("AuthContext: Unexpected error fetching user:", err);
            logout();
        } finally {
            setLoading(false); // Baigėme krovimą
        }
    }, [navigate]); // navigate įtraukiam dėl logout naudojimo

    useEffect(() => {
        // Vykdom tik kartą, kai komponentas užkraunamas
        fetchCurrentUser();
    }, [fetchCurrentUser]); // Priklausomybė - fetchCurrentUser

    // Login funkcija: dabar priima tokeną ir vartotojo duomenis iš komponento
    const login = useCallback((newToken, userData) => {
        console.log("AuthContext: Logging in user:", userData);
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
        // navigate('/'); // Galima nukreipti čia arba komponente
    }, []); // Nepriklauso nuo išorės, bet useCallback gerai turėti

    // Logout funkcija: išvalo viską
    const logout = useCallback(() => {
        console.log("AuthContext: Logging out");
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        // Išvalom Apollo Client kešą, kad neliktų senų duomenų
        client.resetStore();
        navigate('/login');
    }, [navigate]); // Priklauso nuo navigate

    // Kol tikrinamas pradinis tokenas, rodome krovimą
    if (loading) {
        return <div>Tikrinama autentifikacija...</div>;
    }

    // Perduodame reikšmes per Context Provider
    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Sukuriame hook'ą patogesniam naudojimui
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
