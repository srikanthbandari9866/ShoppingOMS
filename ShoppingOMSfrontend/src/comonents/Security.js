import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, FormHelperText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

const Security = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [openErrorDialog, setOpenErrorDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { authData } = useContext(AuthContext);
    const navigate = useNavigate();

    // Handle API call to change password
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Clear any previous errors
        setError('');
        setSuccess('');
        setErrorMessage('');

        // Validation logic
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError('All fields are required');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError('New password and confirmation do not match');
            return;
        }

        try {
            // Make a POST request using axios to change the password
            let obj = { email: authData?.user?.email, newPassword, oldPassword: currentPassword };
            console.log('obj', obj)
            console.log('authData', authData.user)
            const response = await api.put('/Users/changePassword', obj, // Send the payload directly as the backend expects
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            console.log('response', response)
            if (response.status === 200) {
                // If the API call is successful, show success dialog
                setSuccess('Password changed successfully!');
                setOpenDialog(true);

                // Clear fields after successful submission
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {

                // If there is an error with the response (e.g., invalid password), show error dialog
                setErrorMessage(response.data.message || 'Something went wrong');
                setOpenErrorDialog(true);
            }
        } catch (error) {
            console.log(error)

            // Check if error.response exists before accessing data
            if (error.response) {
                setErrorMessage(error.response.data || 'Something went wrong, please try again later');
            } else {
                // Handle errors without response, like network issues
                setErrorMessage('Network error, please try again later');
            }
            setOpenErrorDialog(true);
        }
    };

    // Handle successful dialog close (delete token, user, and navigate to login)
    const handleDialogClose = () => {
        // Remove token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Navigate to login page
        navigate('/login');
        setTimeout(() => {
            window.location.reload(); // Refresh the page
        }, 100);
    };

    // Handle error dialog close
    const handleErrorDialogClose = () => {
        setOpenErrorDialog(false);
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Security
            </Typography>

            {/* Form for password change */}
            <form onSubmit={handleSubmit}>
                {/* Current Password */}
                <TextField
                    label="Current Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />

                {/* New Password */}
                <TextField
                    label="New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                {/* Confirm New Password */}
                <TextField
                    label="Confirm New Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                />

                {/* Error Message */}
                {error && <FormHelperText error>{error}</FormHelperText>}

                {/* Success Message */}
                {success && <FormHelperText>{success}</FormHelperText>}

                {/* Submit Button */}
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    type="submit"  // This will trigger form submission
                >
                    Change Password
                </Button>
            </form>

            {/* Dialog for password change success */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <Typography>Password changed successfully. Please login again.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Error Dialog for failure */}
            <Dialog open={openErrorDialog} onClose={handleErrorDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>{errorMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleErrorDialogClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Security;
