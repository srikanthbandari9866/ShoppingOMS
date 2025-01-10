
import React, { useState, useContext } from 'react';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import Sidebar from '../comonents/SideBar';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import Products from '../comonents/Product';
import ProductPage from './ProductPage';

const AdminDashboard = ({ input, setInput }) => {

    return (
        <>
            <ProductPage input={input} setInput={setInput} />
        </>
    );
};

export default AdminDashboard;


