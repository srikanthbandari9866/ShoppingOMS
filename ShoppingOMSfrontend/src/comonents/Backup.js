// import React, { useEffect, useState, useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext';
// import './App.css';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Home from './pages/Home';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';
// import AppBarComponent from './comonents/AppBarComponent ';
// import AdminAppBarComponent from './comonents/AdminAppBarComponent';
// import UserAppBarComponent from './comonents/UserAppBarComponent';
// import WishListPage from './pages/WishListPage';
// import PlaceOrder from './comonents/PlaceOrder';
// import Orders from './pages/Orders';
// import CartPage from './pages/CartPage';
// import PlacingOrder from './pages/PlacingOrder';
// import Account from './pages/Account';
// import Actions from './pages/Actions';
// import Administration from './pages/Administration';
// import AdminCategories from './comonents/AdminCategories';
// import AdminProducts from './comonents/AdminProducts';
// import CombinedAppBar from './comonents/CombinedAppBar';


// function App() {

//   const { authData } = useContext(AuthContext);
//   let role = authData?.user?.role || null;

//   return (
//     <>
//       <Router>
//         {/* {
//           role == null ? <AppBarComponent /> : role === "Admin" ? <AdminAppBarComponent /> : <UserAppBarComponent />
//         } */}
//         <CombinedAppBar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/forgot-password" element={<ForgotPasswordPage />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />
//           <Route path="/user-dashboard" element={<UserDashboard />} />
//           <Route path="/wishlists" element={<WishListPage />} />
//           <Route path="/placeorder" element={<PlacingOrder />} />
//           <Route path="/orders" element={<Orders />} />
//           <Route path="/carts" element={<CartPage />} />
//           <Route path="/profile" element={<Account />} />
//           <Route path="/actions" element={<Actions />} />
//           <Route path="/administration" element={<Administration />} />
//           <Route path="admin/categories" element={<AdminCategories />} />
//           <Route path="admin/products" element={<AdminProducts />} />

//         </Routes>
//       </Router>

//     </>
//   );
// }

// export default App;
//------------------------------------------------------------------
// import React, { useContext } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext';
// import './App.css';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import Home from './pages/Home';
// import ForgotPasswordPage from './pages/ForgotPasswordPage';
// import AdminDashboard from './pages/AdminDashboard';
// import UserDashboard from './pages/UserDashboard';
// import CombinedAppBar from './comonents/CombinedAppBar';
// import WishListPage from './pages/WishListPage';
// import PlacingOrder from './comonents/PlaceOrder';
// import Orders from './pages/Orders';
// import CartPage from './pages/CartPage';
// import Account from './pages/Account';
// import Actions from './pages/Actions';
// import Administration from './pages/Administration';
// import AdminCategories from './comonents/AdminCategories';
// import AdminProducts from './comonents/AdminProducts';
// import ProtectedRoute from './comonents/ProtectedRoute';
// import PageNotFound from './pages/PageNotFound'; // Import PageNotFound component

// function App() {
//   const { authData, loading } = useContext(AuthContext);
//   const role = authData?.user?.role || null;

//   // If loading, display loading spinner
//   if (loading) {
//     return <div className="loading-spinner">Loading...</div>;
//   }

//   // If user is logged in, prevent access to login, register, forgot password, and home pages
//   const redirectForLoggedInUser = (role) => {
//     if (role === 'Admin') {
//       return <Navigate to="/admin-dashboard" />;
//     } else if (role === 'User') {
//       return <Navigate to="/user-dashboard" />;
//     }
//     return null;
//   };

//   return (
//     <Router>
//       <CombinedAppBar />
//       <Routes>
//         {/* Routes accessible only if the user is not logged in */}
//         <Route path="/" element={role ? redirectForLoggedInUser(role) : <Home />} />
//         <Route path="/login" element={role ? redirectForLoggedInUser(role) : <LoginPage />} />
//         <Route path="/register" element={role ? redirectForLoggedInUser(role) : <RegisterPage />} />
//         <Route path="/forgot-password" element={role ? redirectForLoggedInUser(role) : <ForgotPasswordPage />} />

//         {/* Routes accessible only if user is logged in and role is Admin */}
//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute
//               element={<AdminDashboard />}
//               allowedRoles={['Admin']}
//             />
//           }
//         />
//         <Route
//           path="/admin/categories"
//           element={
//             <ProtectedRoute
//               element={<AdminCategories />}
//               allowedRoles={['Admin']}
//             />
//           }
//         />
//         <Route
//           path="/admin/products"
//           element={
//             <ProtectedRoute
//               element={<AdminProducts />}
//               allowedRoles={['Admin']}
//             />
//           }
//         />
//         <Route
//           path="/actions"
//           element={
//             <ProtectedRoute element={<Actions />} allowedRoles={['Admin']} />
//           }
//         />
//         <Route
//           path="/administration"
//           element={
//             <ProtectedRoute
//               element={<Administration />}
//               allowedRoles={['Admin']}
//             />
//           }
//         />

//         {/* Routes accessible only if user is logged in and role is User or Admin */}
//         <Route
//           path="/user-dashboard"
//           element={
//             <ProtectedRoute
//               element={<UserDashboard />}
//               allowedRoles={['User']}
//             />
//           }
//         />
//         <Route
//           path="/wishlists"
//           element={
//             <ProtectedRoute
//               element={<WishListPage />}
//               allowedRoles={['User', 'Admin']}
//             />
//           }
//         />
//         <Route
//           path="/placeorder"
//           element={
//             <ProtectedRoute
//               element={<PlacingOrder />}
//               allowedRoles={['User', 'Admin']}
//             />
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <ProtectedRoute
//               element={<Orders />}
//               allowedRoles={['User', 'Admin']}
//             />
//           }
//         />
//         <Route
//           path="/carts"
//           element={
//             <ProtectedRoute
//               element={<CartPage />}
//               allowedRoles={['User', 'Admin']}
//             />
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute
//               element={<Account />}
//               allowedRoles={['User', 'Admin']}
//             />
//           }
//         />

//         {/* Catch all undefined routes - 404 Page Not Found */}
//         <Route path="*" element={<PageNotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// ==============================================================================================
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const ProtectedRoute = ({ element, allowedRoles }) => {
//     const { authData, loading } = useContext(AuthContext);
//     const role = authData?.user?.role || null;
//     const isAuthenticated = role !== null;

//     // Show loading screen while authData is being loaded
//     if (loading) {
//         return <div>Loading...</div>; // Or a spinner
//     }

//     // If the user is not authenticated, redirect to login
//     if (!isAuthenticated) {
//         return <Navigate to="/login" />;
//     }

//     // If the user is authenticated but the role does not match, redirect to the appropriate dashboard
//     if (!allowedRoles.includes(role)) {
//         if (role === 'Admin') {
//             return <Navigate to="/admin-dashboard" />;
//         } else if (role === 'User') {
//             return <Navigate to="/user-dashboard" />;
//         }
//     }

//     // If authenticated and role matches, render the requested element
//     return element;
// };

// export default ProtectedRoute;

//===========================================================================================
// import React, { createContext, useState, useEffect } from 'react';
// import api from '../utils/api';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [authData, setAuthData] = useState(null);
//     // const [authUser, setAuthUser] = useState(null)
//     // const [user, setUser] = useState();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         // const role = localStorage.getItem('role');
//         const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; // Parse user
//         if (token) {
//             setAuthData({ token, user });
//             // setAuthUser(authUser);
//         }
//     }, []);

//     const updateBalance = async (newBalance) => {
//     }
//     const updateImage = async (newPath) => {
//         localStorage.removeItem('user');
//         let { userId, userName, role, balance, email } = authData.user;
//         let updatedUser = { userId, userName, role, balance, imagePath: newPath, email }; // Set new image path here
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         setAuthData((prev) => ({
//             ...prev,
//             user: { ...prev.user, imagePath: newPath },
//         }));
//     };

//     const updateAuthData = async (updateUser) => {
//         setAuthData((prev) => ({ ...prev, ...updateUser }))
//     }

//     const login = async (email, password) => {
//         try {
//             // const loginDetails = { email, password }
//             const response = await api.post('/Users/login', { email, password });
//             console.log('API Response:', response.data); // Add this line
//             const { token, user } = response.data;
//             // const role = response.data.user.role
//             if (response.data !== null) {
//                 let userId = user.userId
//                 let userName = user.userName
//                 let role = user.role
//                 let imagePath = user.imagePath
//                 let email = user.email
//                 let userData = { userId, userName, role, imagePath, balance: user.balance, imagePath: user.imagePath, email }
//                 localStorage.setItem('token', token);
//                 // localStorage.setItem('role', role);
//                 localStorage.setItem('user', JSON.stringify(userData));
//             }
//             setAuthData({ token, user });
//             // setAuthUser(user)
//             // setUser(response.data.user)
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setAuthData(null);
//         // setAuthUser(null);
//     };

//     const register = async (registerObj) => {
//         // console.log(registerObj)
//         try {
//             const response = await api.post('/Users/register', registerObj, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });
//             // console.log('API Response:', response.data);
//         } catch (error) {
//             console.error('Registration failed', error);
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ authData, updateBalance, updateAuthData, updateImage, login, logout, register }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext, AuthProvider };

//------------------------------------------------------------------
// import React, { createContext, useState, useEffect } from 'react';
// import api from '../utils/api';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [authData, setAuthData] = useState(null);
//     // const [authUser, setAuthUser] = useState(null)
//     // const [user, setUser] = useState();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         // const role = localStorage.getItem('role');
//         const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null; // Parse user
//         if (token) {
//             setAuthData({ token, user });
//             // setAuthUser(authUser);
//         }
//     }, []);

//     const updateBalance = async (newBalance) => {
//     }
//     const updateImage = async (newPath) => {
//         localStorage.removeItem('user');
//         let { userId, userName, role, balance, email } = authData.user;
//         let updatedUser = { userId, userName, role, balance, imagePath: newPath, email }; // Set new image path here
//         localStorage.setItem('user', JSON.stringify(updatedUser));
//         setAuthData((prev) => ({
//             ...prev,
//             user: { ...prev.user, imagePath: newPath },
//         }));
//     };

//     const updateAuthData = async (updateUser) => {
//         setAuthData((prev) => ({ ...prev, ...updateUser }))
//     }

//     const login = async (email, password) => {
//         try {
//             // const loginDetails = { email, password }
//             const response = await api.post('/Users/login', { email, password });
//             console.log('API Response:', response.data); // Add this line
//             const { token, user } = response.data;
//             // const role = response.data.user.role
//             if (response.data !== null) {
//                 let userId = user.userId
//                 let userName = user.userName
//                 let role = user.role
//                 let imagePath = user.imagePath
//                 let email = user.email
//                 let userData = { userId, userName, role, imagePath, balance: user.balance, imagePath: user.imagePath, email }
//                 localStorage.setItem('token', token);
//                 // localStorage.setItem('role', role);
//                 localStorage.setItem('user', JSON.stringify(userData));
//             }
//             setAuthData({ token, user });
//             // setAuthUser(user)
//             // setUser(response.data.user)
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setAuthData(null);
//         // setAuthUser(null);
//     };

//     const register = async (registerObj) => {
//         // console.log(registerObj)
//         try {
//             const response = await api.post('/Users/register', registerObj, {
//                 headers: {
//                     'Content-Type': 'application/x-www-form-urlencoded',
//                 },
//             });
//             // console.log('API Response:', response.data);
//         } catch (error) {
//             console.error('Registration failed', error);
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ authData, updateBalance, updateAuthData, updateImage, login, logout, register }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext, AuthProvider };

//------------------------------------------------------------------

// import React, { createContext, useState, useEffect } from 'react';
// import api from '../utils/api';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [authData, setAuthData] = useState(null);
//     const [loading, setLoading] = useState(true);  // Track loading state

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

//         // Simulate a small delay for checking authentication
//         setTimeout(() => {
//             if (token && user) {
//                 setAuthData({ token, user });
//             }
//             setLoading(false);  // Set loading to false once authentication check is done
//         }, 500); // Adding a small delay for UX (optional)
//     }, []);

//     const updateBalance = async (newBalance) => {
//         // Update balance logic
//     };

//     const updateImage = async (newPath) => {
//         // Update image logic
//     };

//     const updateAuthData = async (updateUser) => {
//         setAuthData((prev) => ({ ...prev, ...updateUser }));
//     };

//     const login = async (email, password) => {
//         try {
//             const response = await api.post('/Users/login', { email, password });
//             const { token, user } = response.data;
//             if (response.data !== null) {
//                 const userData = { ...user, balance: user.balance };
//                 localStorage.setItem('token', token);
//                 localStorage.setItem('user', JSON.stringify(userData));
//             }
//             setAuthData({ token, user });
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setAuthData(null);
//     };

//     const register = async (registerObj) => {
//         try {
//             await api.post('/Users/register', registerObj, {
//                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//             });
//         } catch (error) {
//             console.error('Registration failed', error);
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ authData, loading, updateBalance, updateAuthData, updateImage, login, logout, register }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthContext, AuthProvider };



