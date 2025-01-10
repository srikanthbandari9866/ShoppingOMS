
import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const balance = 100000;
    const role = 'User';
    const isActive = 1;

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        try {
            const user = { userName, phoneNumber, email, password, balance, role, isActive };
            await register(user);
            navigate('/login'); // Redirect to login after successful registration
        } catch (err) {
            setError('Registration failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>Register</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <form onSubmit={handleRegister}>
                <TextField
                    label="User Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
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
                    label="Phone Number"
                    type="text"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
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
                    Register
                </Button>
            </form>
            <Typography align="center" variant="body2" sx={{ marginTop: 2 }}>
                Already registered?{' '}
                <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/login')}
                >
                    Sign In
                </Link>
            </Typography>
        </Container>
    );
};

export default RegisterPage;
