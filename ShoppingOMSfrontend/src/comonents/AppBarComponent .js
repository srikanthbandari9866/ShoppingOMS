import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AppBarComponent = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    ShoppingOMS
                </Typography>
                <Button color="inherit" component={RouterLink} to="/login">
                    Login
                </Button>
                <Button color="inherit" component={RouterLink} to="/register">
                    Register
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppBarComponent;
