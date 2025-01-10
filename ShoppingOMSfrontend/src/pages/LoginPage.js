import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Hook for navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Navigate to dashboard or desired page on successful login
            const user = JSON.parse(localStorage.getItem('user'));
            // const role = localStorage.getItem('user');
            user.role === "Admin" ? navigate("/admin-dashboard") : navigate("/user-dashboard")
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <Container maxWidth="xs">
                <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    <form onSubmit={handleLogin} style={{ width: '100%' }}>
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                    </form>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate('/forgot-password')}
                        sx={{ marginTop: 2, textAlign: 'center' }}
                    >
                        Forgot Password?
                    </Link>
                    <Typography align="center" variant="body2" sx={{ marginTop: 2 }}>
                        Don't have an account?{' '}
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/register')}
                        >
                            Create Account
                        </Link>
                    </Typography>
                </Box>
            </Container>
        </div>
    );
};

export default LoginPage;
