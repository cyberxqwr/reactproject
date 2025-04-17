import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../ApolloClient';
import { CURRENT_USER_QUERY } from '../graphql/queries';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    const fetchCurrentUser = useCallback(async () => {
        const currentToken = localStorage.getItem('authToken');
        if (!currentToken) {
            setLoading(false);
            return; 
        }

        console.log("AuthContext: Fetching current user...");
        try {
            
            const { data, error } = await client.query({
                query: CURRENT_USER_QUERY,
                fetchPolicy: 'network-only'
            });

            if (error) {
                
                console.error("AuthContext: Error fetching current user:", error.message);
                logout();
            } else if (data?.currentUser) {
                console.log("AuthContext: Current user fetched:", data.currentUser);
                setUser(data.currentUser);
                setIsAuthenticated(true);
                setToken(currentToken);
            } else {
                
                 console.warn("AuthContext: currentUser query succeeded but returned no user.");
                 logout();
            }
        } catch (err) {
            // Kitokios klaidos
            console.error("AuthContext: Unexpected error fetching user:", err);
            logout();
        } finally {
            setLoading(false);
        }
    }, [navigate]); 

    useEffect(() => {

        fetchCurrentUser();
    }, [fetchCurrentUser]); 

    const login = useCallback((newToken, userData) => {
        console.log("AuthContext: Logging in user:", userData);
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
        // navigate('/'); // Galima nukreipti čia arba komponente
    }, []); 

    const register = useCallback((newToken, userData) => {
        localStorage.setItem();
    })

    const logout = useCallback(() => {
        console.log("AuthContext: Logging out");
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        client.resetStore();
    }, [navigate]); 

    if (loading) {
        return <div>Tikrinama autentifikacija...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
