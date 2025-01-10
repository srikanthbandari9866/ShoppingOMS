import React, { useState, useEffect, useContext } from 'react';
import {
    Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton, Avatar, CircularProgress, Alert, Grid, Paper, Divider
} from '@mui/material';
import { AddPhotoAlternate as AddPhotoIcon } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';  // Import your AuthContext here
import api from '../utils/api';

const MyProfile = () => {
    const { authData, updateImage } = useContext(AuthContext);  // Get authData from AuthContext

    const [user, setUser] = useState(null);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [newBalance, setNewBalance] = useState('');
    const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false);

    // Fetch user details from the API based on the userId in authData
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await api.get(`/Users/userById/${authData.user.userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        if (authData?.user?.userId) {
            fetchUserDetails();
        }
    }, [authData]);

    const handleAddPhoto = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploadingPhoto(true);
            const formData = new FormData();
            formData.append('file', file);
            try {
                // API call to upload the photo
                const response = await api.put(`/Users/changeImage/${authData.user.userId}`, formData, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                // Update the user with the new image path
                setUser((prevUser) => ({
                    ...prevUser,
                    imagePath: response.data.imagePath,
                }));
                await updateImage(response.data.imagePath);

                setIsUploadingPhoto(false);
            } catch (error) {
                console.log('error', error)
                // Check if error.response exists before accessing data
                if (error.response) {
                    setErrorMessage(error.response.data.File || 'Something went wrong, please try again later');
                } else {
                    // Handle errors without response, like network issues
                    setErrorMessage('Error uploading photo. Please try again.');
                }
                setIsUploadingPhoto(false);

            }
        }
    };

    // Handle adding balance
    const handleAddBalance = async () => {
        if (parseFloat(newBalance) > 0) {
            try {
                await api.post(`/Users/${authData.userId}/addBalance`, { balance: newBalance });
                setUser((prevUser) => ({
                    ...prevUser,
                    balance: prevUser.balance + parseFloat(newBalance)
                }));
                setIsAddBalanceDialogOpen(false);
            } catch (error) {
                console.error('Error adding balance:', error);
                setErrorMessage('Error adding balance. Please try again.');
            }
        } else {
            setErrorMessage('Please enter a valid amount.');
        }
    };

    if (!user) {
        return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    }

    return (
        <Box sx={{ p: 4, maxWidth: 600 }}>
            {/* <Box sx={{ p: 4, maxWidth: 900, margin: 'auto' }}> */}
            {/* <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                My Profile
            </Typography> */}

            {/* Error Message */}
            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
                <Grid container spacing={3}>
                    {/* Left side: Avatar & Add Photo */}
                    <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Avatar
                            src={user?.imagePath || '/default-avatar.jpg'}
                            sx={{ width: 120, height: 120, mb: 2 }}
                        />
                        {isUploadingPhoto ? (
                            <CircularProgress size={24} />
                        ) : (
                            <IconButton color="primary" component="label">
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleAddPhoto}
                                />
                                <AddPhotoIcon />
                            </IconButton>
                        )}
                    </Grid>

                    {/* Right side: Personal Info, Balance, and Actions */}
                    <Grid item xs={12} md={8}>
                        {/* Personal Information Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Personal Information
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                <strong>Username:</strong> {user?.userName}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Email:</strong> {user?.email}
                            </Typography>
                            <Typography variant="body1">
                                <strong>Phone:</strong> {user?.phoneNumber}
                            </Typography>
                        </Box>

                        <Divider sx={{ width: '100%', mb: 3 }} />

                        {/* Wallet Balance Section */}
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                Wallet Balance
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                                <strong>Balance:</strong> Rs. {user?.balance?.toFixed(2) || 0}
                            </Typography>
                        </Box>

                        <Divider sx={{ width: '100%', mb: 3 }} />

                        {/* Add Money to Wallet Button */}
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            sx={{ padding: '12px', fontWeight: 'bold' }}
                            onClick={() => setIsAddBalanceDialogOpen(true)}
                        >
                            Add Money to Wallet
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Add Balance Dialog */}
            <Dialog open={isAddBalanceDialogOpen} onClose={() => setIsAddBalanceDialogOpen(false)}>
                <DialogTitle>Add Balance</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Enter Amount"
                        fullWidth
                        value={newBalance}
                        onChange={(e) => setNewBalance(e.target.value)}
                        type="number"
                        error={parseFloat(newBalance) <= 0}
                        helperText={parseFloat(newBalance) <= 0 ? 'Please enter a valid amount' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAddBalanceDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddBalance} color="primary">
                        Add Balance
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyProfile;










// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import {
//     Box, Typography, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
//     IconButton, Avatar, CircularProgress, Alert
// } from '@mui/material';
// import { AddPhotoAlternate as AddPhotoIcon } from '@mui/icons-material';
// import { AuthContext } from '../context/AuthContext';  // Import your AuthContext here
// import api from '../utils/api';

// const MyProfile = () => {
//     const { authData, updateImage } = useContext(AuthContext);  // Get authData from AuthContext

//     const [user, setUser] = useState(null);
//     const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [newBalance, setNewBalance] = useState('');
//     const [isAddBalanceDialogOpen, setIsAddBalanceDialogOpen] = useState(false);

//     // Fetch user details from the API based on the userId in authData
//     useEffect(() => {
//         console.log('in useffect my profile')
//         const fetchUserDetails = async () => {
//             try {
//                 const response = await api.get(`/Users/userById/${authData.user.userId}`);
//                 setUser(response.data);
//             } catch (error) {
//                 console.error('Error fetching user details:', error);
//             }
//         };

//         if (authData?.user?.userId) {
//             fetchUserDetails();
//         }
//     }, [authData]);

//     const handleAddPhoto = async (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setIsUploadingPhoto(true);
//             const formData = new FormData();
//             formData.append('file', file);
//             console.log('File details:');
//             console.log('Name:', file.name);
//             console.log('Size:', file.size);
//             console.log('Type:', file.type);
//             try {
//                 // API call to upload the photo
//                 const response = await api.put(`/Users/changeImage/${authData.user.userId}`, formData, {
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                     },
//                 });

//                 // Update the user with the new image path
//                 setUser((prevUser) => ({
//                     ...prevUser,
//                     imagePath: response.data.imagePath,
//                 }));
//                 await updateImage(response.data.imagePath);

//                 setIsUploadingPhoto(false);
//             } catch (error) {
//                 console.log(error)
//                 setIsUploadingPhoto(false);

//                 // Handle specific error types (e.g., network or server issues)
//                 if (error.response) {
//                     // Server returned a response with an error status
//                     setErrorMessage('Error uploading photo: ' + error.response.data.File[0] || 'Please try again later.');
//                 } else if (error.request) {
//                     // Request was made but no response received
//                     setErrorMessage('Network error. Please check your connection and try again.');
//                 } else {
//                     // Something else went wrong
//                     setErrorMessage('An unexpected error occurred. Please try again.');
//                 }
//             }
//         }
//     };

//     // Handle adding balance
//     const handleAddBalance = async () => {
//         //     if (parseFloat(newBalance) > 0) {
//         //         try {
//         //             await axios.post(`/Users/${authData.userId}/addBalance`, { balance: newBalance });
//         //             setUser((prevUser) => ({
//         //                 ...prevUser,
//         //                 balance: prevUser.balance + parseFloat(newBalance)
//         //             }));
//         //             setIsAddBalanceDialogOpen(false);
//         //         } catch (error) {
//         //             console.error('Error adding balance:', error);
//         //         }
//         //     }
//     };

//     if (!user) {
//         return <CircularProgress />;
//     }

//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h4" gutterBottom>
//                 My Profile
//             </Typography>
//             {errorMessage && (
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                     {errorMessage}
//                 </Alert>
//             )}
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
//                 <Avatar
//                     src={user?.imagePath || '/default-avatar.jpg'}
//                     sx={{ width: 100, height: 100, mr: 2 }}
//                 />
//                 {isUploadingPhoto ? (
//                     <CircularProgress size={24} />
//                 ) : (
//                     <IconButton color="primary" component="label">
//                         <input
//                             type="file"
//                             hidden
//                             accept="image/*"
//                             onChange={handleAddPhoto}
//                         />
//                         <AddPhotoIcon />
//                     </IconButton>
//                 )}
//             </Box>

//             <Typography variant="h6" gutterBottom>
//                 User Information
//             </Typography>
//             <Box sx={{ mb: 2 }}>
//                 <Typography variant="body1"><strong>Username:</strong> {user?.userName}</Typography>
//                 <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
//                 <Typography variant="body1"><strong>Phone:</strong> {user?.phoneNumber}</Typography>
//                 <Typography variant="body1"><strong>Balance:</strong> Rs. {user?.balance?.toFixed(2) || 0}</Typography>
//             </Box>

//             <Box sx={{ mt: 4 }}>
//                 <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => setIsAddBalanceDialogOpen(true)}
//                 >
//                     Add Money to Wallet
//                 </Button>
//             </Box>

//             {/* Add Balance Dialog */}
//             <Dialog open={isAddBalanceDialogOpen} onClose={() => setIsAddBalanceDialogOpen(false)}>
//                 <DialogTitle>Add Balance</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Enter Amount"
//                         fullWidth
//                         value={newBalance}
//                         onChange={(e) => setNewBalance(e.target.value)}
//                         type="number"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setIsAddBalanceDialogOpen(false)} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleAddBalance} color="primary">
//                         Add Balance
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default MyProfile;


