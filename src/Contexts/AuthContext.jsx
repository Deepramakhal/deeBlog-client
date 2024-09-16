/*eslint-disable*/
import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    const login = (token) => {
        setAccessToken(token);
        setIsLoggedIn(true);
        localStorage.setItem('accessToken', token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        delete axios.defaults.headers.common['Authorization'];
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            // Set token if it exists in local storage
            setAccessToken(token);
            setIsLoggedIn(true);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        } else {
            // Attempt to refresh token if no access token found
            axios.post('/refresh-token')
                .then((response) => {
                    const newAccessToken = response.data.accessToken;
                    login(newAccessToken); // Call login to set new token
                })
                .catch((error) => {
                    console.log('Unable to refresh token', error);
                });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoggedIn, accessToken }}>
            {children}
        </AuthContext.Provider>
    );
};
