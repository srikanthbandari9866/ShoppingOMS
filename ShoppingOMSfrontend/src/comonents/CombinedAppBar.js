import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Avatar, TextField, Paper, InputBase } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ProductContext } from '../context/ProductContext';
import SearchIcon from '@mui/icons-material/Search';


const CombinedAppBar = ({ setInput }) => {
    const { authData, logout } = useContext(AuthContext);
    const { carts } = useContext(ProductContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        handleMenuClose();
    };
    const handleSearch = () => {
        setInput(searchQuery)
    }

    // Determine role (Admin, User, or Guest)
    const role = authData?.user?.role || null;
    const isLoggedIn = role !== null;

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, display: 'flex' }}>
                    <Button color="inherit" component={RouterLink} to={role === "Admin" ? "/admin-dashboard" : "/user-dashboard"}>
                        ShoppingOMS
                    </Button>
                    <div>
                        {
                            isLoggedIn && (
                                <>
                                    {/* <TextField
                                        label="Search by product name"
                                        id="filled-size-small"
                                        variant="filled"
                                        size="small"
                                        // color="info"
                                        // fullWidth
                                        sx={{ ml: 1, background: '#e8eafd', borderRadius: '5px' }} //, background: 'white', borderRadius: '5px'
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    /> */}
                                    <Paper
                                        component="form"
                                        sx={{ ml: 2, p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, height: 40 }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Search products"
                                            inputProps={{ 'aria-label': 'search google maps' }}
                                            onChange={(e) => { setSearchQuery(e.target.value); setInput(e.target.value) }}
                                        />
                                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch} >
                                            <SearchIcon />
                                        </IconButton>

                                    </Paper>
                                </>
                            )
                        }
                    </div>
                </Typography>

                {/* Display links based on the user's role */}
                {!isLoggedIn ? (
                    <>
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/register">
                            Register
                        </Button>
                    </>
                ) : role === "Admin" ? (
                    <>
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
                        <Button color="inherit" component={RouterLink} to="/carts">
                            Carts
                        </Button>
                    </>
                ) : (
                    <>
                        <Button color="inherit" component={RouterLink} to="/orders">
                            Orders
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/wishlists">
                            Wishlist
                        </Button>
                        <Button color="inherit" component={RouterLink} to="/carts">
                            Carts
                        </Button>
                    </>
                )}

                {/* Avatar menu for logged-in users */}
                {isLoggedIn && (
                    <>
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
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default CombinedAppBar;
