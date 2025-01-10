

import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Home from './pages/Home';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import CombinedAppBar from './comonents/CombinedAppBar';
import WishListPage from './pages/WishListPage';
import PlacingOrder from './pages/PlacingOrder';
import Orders from './pages/Orders';
import CartPage from './pages/CartPage';
import Account from './pages/Account';
import Actions from './pages/Actions';
import Administration from './pages/Administration';
import AdminCategories from './comonents/AdminCategories';
import AdminProducts from './comonents/AdminProducts';
import ProtectedRoute from './comonents/ProtectedRoute';
import PageNotFound from './pages/PageNotFound'; // Import PageNotFound component
import LoginModal from './comonents/LoginModal';
import AuthVerifyComponent from './comonents/AuthVerifyComponent';

function App() {
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const { authData, loading } = useContext(AuthContext);
  const [input, setInput] = useState('')
  const role = authData?.user?.role || null;


  // const handleUnauthorized = () => {
  //   setModalOpen(true); // Show the login modal
  // };
  // // Always call useEffect (unconditionally)
  // useEffect(() => {
  //   if (!loading && !authData?.token) {
  //     handleUnauthorized(); // Show the login modal if no token is present
  //   }
  // }, [authData?.token, loading]); // Dependency on token to re-run when it changes

  // If loading, display loading spinner
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }



  // If user is logged in, prevent access to login, register, forgot password, and home pages
  const redirectForLoggedInUser = (role) => {
    if (role === 'Admin') {
      return <Navigate to="/admin-dashboard" />;
    } else if (role === 'User') {
      return <Navigate to="/user-dashboard" />;
    }
    return null;
  };

  return (
    <Router>
      <CombinedAppBar setInput={setInput} />
      <Routes>
        {/* Routes accessible only if the user is not logged in */}
        <Route path="/" element={role ? redirectForLoggedInUser(role) : <Home />} />
        <Route path="/login" element={role ? redirectForLoggedInUser(role) : <LoginPage />} />
        <Route path="/register" element={role ? redirectForLoggedInUser(role) : <RegisterPage />} />
        <Route path="/forgot-password" element={role ? redirectForLoggedInUser(role) : <ForgotPasswordPage />} />

        {/* Routes accessible only if user is logged in and role is Admin */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              element={<AdminDashboard input={input} setInput={setInput} />}
              allowedRoles={['Admin']}
            />
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute
              element={<AdminCategories />}
              allowedRoles={['Admin']}
            />
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute
              element={<AdminProducts />}
              allowedRoles={['Admin']}
            />
          }
        />
        <Route
          path="/actions"
          element={
            <ProtectedRoute element={<Actions />} allowedRoles={['Admin']} />
          }
        />
        <Route
          path="/administration"
          element={
            <ProtectedRoute
              element={<Administration />}
              allowedRoles={['Admin']}
            />
          }
        />

        {/* Routes accessible only if user is logged in and role is User or Admin */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute
              element={<UserDashboard input={input} setInput={setInput} />}
              allowedRoles={['User']}
            />
          }
        />
        <Route
          path="/wishlists"
          element={
            <ProtectedRoute
              element={<WishListPage />}
              allowedRoles={['User', 'Admin']}
            />
          }
        />
        <Route
          path="/placeorder"
          element={
            <ProtectedRoute
              element={<PlacingOrder />}
              allowedRoles={['User', 'Admin']}
            />
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              element={<Orders />}
              allowedRoles={['User', 'Admin']}
            />
          }
        />
        <Route
          path="/carts"
          element={
            <ProtectedRoute
              element={<CartPage />}
              allowedRoles={['User', 'Admin']}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={<Account />}
              allowedRoles={['User', 'Admin']}
            />
          }
        />

        {/* Catch all undefined routes - 404 Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {/* <LoginModal open={modalOpen} handleClose={() => setModalOpen(false)} /> */}
      <AuthVerifyComponent />
    </Router>
  );
}

export default App;

