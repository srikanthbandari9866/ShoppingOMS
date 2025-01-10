import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import MyProfile from '../comonents/MyProfile';
import SavedAddress from '../comonents/SavedAddress';
import Security from '../comonents/Security';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Navigate to login page
        navigate('/login');
        setTimeout(() => {
            window.location.reload(); // Refresh the page
        }, 100);
    }
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <MyProfile />;
            case 'address':
                return <SavedAddress />;
            case 'security':
                return <Security />;
            case 'logout':
                // Handle logout logic
                return <Typography variant="h6">Logging out...</Typography>;
            default:
                return <MyProfile />;
        }
    };

    return (
        <Box display="flex" sx={{ height: '100vh' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: 250,
                    bgcolor: 'background.paper',
                    borderRight: '1px solid #ddd',
                    p: 2,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Account
                </Typography>
                <Divider />
                <List>
                    <ListItem button onClick={() => setActiveTab('profile')}>
                        <ListItemText primary="My Profile" />
                    </ListItem>
                    <ListItem button onClick={() => setActiveTab('address')}>
                        <ListItemText primary="Saved Address" />
                    </ListItem>
                    <ListItem button onClick={() => setActiveTab('security')}>
                        <ListItemText primary="Security" />
                    </ListItem>
                    <ListItem button onClick={() => { setActiveTab('logout'); handleLogout(); }}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </Box>

            {/* Content Area */}
            <Box flex={1} sx={{ p: 3 }}>
                {renderContent()}
            </Box>
        </Box>
    );
};

export default Account;
