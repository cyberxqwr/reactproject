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
                
                logout();
            } else if (data?.currentUser) {
                setUser(data.currentUser);
                setIsAuthenticated(true);
                setToken(currentToken);
            } else {
                
                 logout();
            }
        } catch (err) {

            console.error(err);
            logout();
        } finally {
            setLoading(false);
        }
    }, [navigate]); 

    useEffect(() => {

        fetchCurrentUser();
    }, [fetchCurrentUser]); 

    const login = useCallback((newToken, userData) => {
        localStorage.setItem('authToken', newToken);
        setToken(newToken);
        setUser(userData);
        setIsAuthenticated(true);
    }, []); 


    const logout = useCallback(() => {
        console.log("AuthContext: Prisijungiama");
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
