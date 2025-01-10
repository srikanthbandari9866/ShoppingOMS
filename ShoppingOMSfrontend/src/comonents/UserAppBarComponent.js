import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const UserAppBarComponent = () => {
    const { logout, authData } = useContext(AuthContext)
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

    return (

        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" component={RouterLink} to="/user-dashboard">
                        ShoppingOMS
                    </Button>
                </Typography>
                <Button color="inherit" component={RouterLink} to="/orders">
                    Orders
                </Button>
                <Button color="inherit" component={RouterLink} to="/wishlists">
                    Wishlist
                </Button>
                <Button color="inherit" component={RouterLink} to="/carts">
                    Cart
                </Button>
                {/* User Photo with Dropdown */}
                <IconButton onClick={handleMenuClick} sx={{ ml: 2 }}>
                    <Avatar src={authData.user.imagePath} alt="User" />
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
                    <MenuItem onClick={handleMenuClose} component={RouterLink} to="/profile">
                        Profile
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={RouterLink} to="/update-profile">
                        Update Profile
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={RouterLink} to="/change-password">
                        Change Password
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} component={RouterLink} to="/shipping-address">
                        Shipping Address
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default UserAppBarComponent;