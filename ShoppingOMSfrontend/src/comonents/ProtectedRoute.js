import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { authData, loading } = useContext(AuthContext);
    const role = authData?.user?.role || null;
    const isAuthenticated = role !== null;

    // Show loading screen while authData is being loaded
    if (loading) {
        return <div>Loading...</div>; // Or a spinner
    }

    // If the user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // If the user is authenticated but the role does not match, redirect to the appropriate dashboard
    if (!allowedRoles.includes(role)) {
        if (role === 'Admin') {
            return <Navigate to="/admin-dashboard" />;
        } else if (role === 'User') {
            return <Navigate to="/user-dashboard" />;
        }
    }

    // If authenticated and role matches, render the requested element
    return element;
};

export default ProtectedRoute;
