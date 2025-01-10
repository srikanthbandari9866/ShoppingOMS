import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import AppBarComponent from '../comonents/AppBarComponent ';

function Home() {
    return (
        <>
            {/* <AppBarComponent /> */}
            <LoginPage />

        </>
    );
}

export default Home;
