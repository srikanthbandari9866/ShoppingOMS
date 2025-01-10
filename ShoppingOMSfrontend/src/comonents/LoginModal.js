import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ open, handleClose }) => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        // Redirect to login page when the modal action button is clicked
        navigate('/login');
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Session Expired</DialogTitle>
            <DialogContent>
                <p>Your session has expired. Please log in again.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleLoginRedirect} color="primary">
                    Log in
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
