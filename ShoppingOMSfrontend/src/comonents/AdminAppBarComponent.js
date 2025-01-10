import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Avatar, TextField } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../pages/AdminDashboard';
import { ProductContext } from '../context/ProductContext';

const AdminAppBarComponent = () => {
    const { logout, authData } = useContext(AuthContext)
    const { carts } = useContext(ProductContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout()
        navigate("/login")
        // console.log("Logged out");
        handleMenuClose();
    };
    const handleClick = () => {
        navigate("/carts");
        // navigate("/carts", { state: { carts } });
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={RouterLink} to="/admin-dashboard">
                            ShoppingOMS
                        </Button>
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/actions">
                        Actions
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/administration">
                        Administration
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/orders">
                        Orders
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/wishlists">
                        Wishlist
                    </Button>
                    <Button color="inherit" onClick={handleClick}>
                        Cart
                    </Button>
                    {/* <Button color="inherit" component={RouterLink} to="/carts">
                        Cart
                    </Button> */}
                    {/* User Photo with Dropdown */}
                    <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
                        <Avatar src={authData?.user?.imagePath} alt="User" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem component={RouterLink} to="/profile">
                            <Typography variant="body1" color="primary">{authData?.user?.email}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">
                            Profile

                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            {/* <AdminDashboard /> */}
        </>
    );
};

export default AdminAppBarComponent;
