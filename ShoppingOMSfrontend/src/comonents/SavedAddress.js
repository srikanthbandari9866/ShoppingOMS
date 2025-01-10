import React, { useState, useContext } from 'react';
import { Box, Typography, Button, List, ListItem, TextField } from '@mui/material';
import { ShippingContext } from '../context/ShippingContext';
import { AuthContext } from '../context/AuthContext';

const SavedAddress = () => {
    const { shippingAddresses, addShippingAddress, updateShippingAddress, removeShippingAddress } = useContext(ShippingContext);
    const { authData } = useContext(AuthContext)

    const [isEdit, setIsEdit] = useState(false);
    const [currentAddress, setCurrentAddress] = useState('');
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    // Handle editing an address
    const handleEdit = (address, id) => {
        setCurrentAddress(address);
        setEditId(id);
        setIsEdit(true);
        setError('');  // Clear error when starting edit
    };

    // Handle adding a new address
    const handleAdd = () => {
        // Validate the address before adding
        if (currentAddress === '') {
            setError('Address is required');
            return;
        }

        const newAddress = {
            userId: authData.user.userId,
            shippingAddress: currentAddress,
        };

        // Add the address and clear form
        addShippingAddress(newAddress);
        setCurrentAddress('');
        setIsEdit(false);
        setError('');
    };

    // Handle saving the address (either adding or editing)
    const handleSave = async () => {
        console.log('currentAddress:', currentAddress)
        // Validate the address before saving
        if (currentAddress === '') {
            setError('Address is required');
            return;
        }

        if (isEdit) {
            // If editing, update the address
            const updatedAddress = {
                shippingId: editId,
                shippingAddress: currentAddress,
            };
            await updateShippingAddress(editId, updatedAddress);
        } else {
            // If adding, add the new address
            await addShippingAddress({
                userId: authData.user.userId,
                shippingAddress: currentAddress,
            });
        }

        // Reset after save
        setCurrentAddress('');
        setIsEdit(false);
        setEditId(null);
        setError('');
    };

    // Handle deleting an address
    const handleDelete = async (id) => {
        await removeShippingAddress(id);
    };

    return (
        <Box sx={{ overflow: 'auto', p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Saved Addresses
            </Typography>

            {/* List of saved addresses */}
            <List>
                {shippingAddresses.map((item) => (
                    <ListItem key={item.shippingId} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>{item.shippingAddress}</Typography>
                        <Box>
                            <Button variant="text" color="primary" onClick={() => handleEdit(item.shippingAddress, item.shippingId)}>
                                Edit
                            </Button>
                            <Button variant="text" color="secondary" onClick={() => handleDelete(item.shippingId)}>
                                Delete
                            </Button>
                        </Box>
                    </ListItem>
                ))}
            </List>

            {/* Error message */}
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

            {/* Input field for adding or editing address */}
            <TextField
                label="Address"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                value={currentAddress}
                onChange={(e) => setCurrentAddress(e.target.value)}
            />

            {/* Buttons for adding, saving, or canceling */}
            <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2, gap: 2 }}>
                {isEdit && (
                    <>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save Changes
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setIsEdit(false);
                                setEditId(null);
                                setCurrentAddress('');
                                setError('')
                            }}
                        >
                            Cancel
                        </Button>
                    </>
                )}

                {!isEdit && (
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAdd}
                        sx={{ ml: 2 }}
                    >
                        Add New Address
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SavedAddress;
