import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const response = await api.put('/Users/forgetPassword', { email, password });
            if (response.status === 200) {
                navigate('/login');
            }
        } catch (err) {
            setDialogMessage(err.response?.data || 'An unexpected error occurred.');
            setDialogOpen(true);
        }
    };

    const closeDialog = () => setDialogOpen(false);

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Forgot Password</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleForgotPassword}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
            <Typography align="center" variant="body2" sx={{ marginTop: 2 }}>
                Remember password?{' '}
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </Link>
            </Typography>

            {/* Dialog Popup */}
            <Dialog open={dialogOpen} onClose={closeDialog}>
                {/* <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>{dialogMessage}</Typography>
                </DialogContent> */}
                <DialogTitle
                    sx={{
                        backgroundColor: '#ffcccc',
                        color: '#d32f2f',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Invalid Email!
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{
                        padding: '30px',
                    }}>{dialogMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ForgotPasswordPage;
