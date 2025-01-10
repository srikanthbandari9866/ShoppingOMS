import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';


function UserDashboard({ input, setInput }) {
    return (
        <>

            <ProductPage input={input} setInput={setInput} />

        </>
    );
}

export default UserDashboard;
