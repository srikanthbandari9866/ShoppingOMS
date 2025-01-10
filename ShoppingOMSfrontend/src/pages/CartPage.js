import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AppBarComponent from '../comonents/AppBarComponent ';
import { ProductContext } from '../context/ProductContext';
import PlaceOrder from '../comonents/PlaceOrder';

function CartPage() {
    // const location = useLocation();
    // const { cartList } = location.state || {};

    const { carts } = useContext(ProductContext)
    console.log('carts: ', carts)

    return (
        <>
            <PlaceOrder items={carts} />
        </>
    );
}

export default CartPage;