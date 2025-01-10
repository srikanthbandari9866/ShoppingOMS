
import React, { createContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        // Simulate a small delay for checking authentication
        setTimeout(() => {
            if (token && user) {
                setAuthData({ token, user });
            }
            setLoading(false);  // Set loading to false once authentication check is done
        }, 100); // Adding a small delay for UX (optional)
    }, []);

    const updateBalance = async (newBalance) => {
        // Update balance logic
    };

    const updateImage = async (newPath) => {
        localStorage.removeItem('user');
        let { userId, userName, role, balance, email } = authData.user;
        let updatedUser = { userId, userName, role, balance, imagePath: newPath, email }; // Set new image path here
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAuthData((prev) => ({
            ...prev,
            user: { ...prev.user, imagePath: newPath },
        }));
    };


    const updateAuthData = async (updateUser) => {
        setAuthData((prev) => ({ ...prev, ...updateUser }));
    };

    const login = async (email, password) => {
        try {
            const response = await api.post('/Users/login', { email, password });
            const { token, user } = response.data;
            if (response.data !== null) {
                const userData = { ...user, balance: user.balance };
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
            }
            setAuthData({ token, user });
            // setLoading(true)
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthData(null);
    };

    const register = async (registerObj) => {
        try {
            await api.post('/Users/register', registerObj, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    return (
        <AuthContext.Provider value={{ authData, loading, updateBalance, updateAuthData, updateImage, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

