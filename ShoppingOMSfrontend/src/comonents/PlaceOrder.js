import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box, Typography, Button, Grid, TextField, Divider, Alert, MenuItem, Select, InputLabel, FormControl, Card, CardMedia,
    CardContent, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, CircularProgress
} from '@mui/material';
import { ShippingContext } from '../context/ShippingContext';
import { ProductContext } from '../context/ProductContext';

import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from '@mui/icons-material';

const PlaceOrder = ({ items }) => {
    console.log('items in place order: ', Array.isArray(items), items)
    const location = useLocation();
    const navigate = useNavigate();
    const { shippingAddresses } = useContext(ShippingContext);
    const { removeFromCart, carts } = useContext(ProductContext);
    const { authData, updateBalance } = useContext(AuthContext);
    const userId = authData?.user?.userId;
    const userName = authData?.user?.userName;
    const balance = authData?.user?.balance;

    const [selectedAddress, setSelectedAddress] = useState('');
    const [customAddress, setCustomAddress] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [error, setError] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  // New loading state

    // For the success modal and confirmation modal
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    useEffect(() => {
        if (items) {
            setOrderItems(items);
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
        }
    }, [items]);

    // Calculate the total price and discount
    const calculateTotal = (items) => {
        if (!Array.isArray(items)) {
            items = [];  // Ensure items is always an array
        }

        let totalPrice = 0;
        let totalDiscount = 0;
        let itemsCount = 0;

        const processedItems = items.map((item) => {
            const discountedPrice = item.price * item.itemCount - (item.price * (item.discount || 0)) / 100;
            totalPrice += discountedPrice;
            itemsCount += item.itemCount;
            totalDiscount += (item.price * (item.discount || 0)) / 100;

            return {
                itemId: item.itemId,
                itemName: item.itemName,
                imagePath: item.imagePath,
                totalPrice: discountedPrice, // Store discounted price
                orderQuantity: item.itemCount,
                discount: totalDiscount,
            };
        });

        return { processedItems, totalPrice, totalDiscount, itemsCount };
    };

    const { processedItems, totalPrice, totalDiscount, itemsCount } = calculateTotal(orderItems);
    console.log('orderedItems: ', orderItems)
    console.log(processedItems, totalPrice, totalDiscount, itemsCount)

    const handlePlaceOrder = async () => {
        console.log(`Current wallet balance: ${balance}`)
        const shippingAddress = selectedAddress || customAddress.trim();
        if (!shippingAddress) {
            setError('Shipping address is required.');
            return;
        }
        if (balance < totalPrice) {
            setError(`Current wallet balance: ${balance} is less than TotalPrice`);
            return;
        }
        // Show the confirmation dialog
        setOpenConfirmDialog(true);
    };

    const handleConfirmOrder = async () => {
        const shippingAddress = selectedAddress || customAddress.trim();
        const orderPayload = {
            userId: userId,
            userName: userName,
            orderTotal: itemsCount,
            totalPrice: totalPrice,
            discount: totalDiscount,
            date: new Date().toLocaleString(),
            orderStatus: 'PLACED',
            shippingAddress,
            orderItems: processedItems,
        };

        try {
            // Submit the order
            const response = await api.post('/Orders/add', orderPayload);

            if (response.data !== null) {
                setOrderPlaced(true);
                setOpenModal(true);  // Open the success modal
            } else {
                setError('Failed to place order.');
            }
        } catch (err) {
            setError('An error occurred while placing the order.');
        }
        setOpenConfirmDialog(false);  // Close the confirmation dialog
    };

    const handleCloseModal = async () => {
        await updateBalance(balance - totalPrice)
        setOpenModal(false);  // Close the success modal
        navigate('/orders');  // Navigate to orders page
        console.log('placeorder authData: ', authData)
    };

    const handleCancelConfirmation = () => {
        setOpenConfirmDialog(false);  // Close the confirmation dialog
    };

    const handleIncreaseQuantity = (itemId) => {
        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.itemId === itemId ? { ...item, itemCount: item.itemCount + 1 } : item
            )
        );
    };

    const handleDecreaseQuantity = (itemId) => {
        setOrderItems((prevItems) =>
            prevItems.map((item) =>
                item.itemId === itemId && item.itemCount > 1
                    ? { ...item, itemCount: item.itemCount - 1 }
                    : item
            )
        );
    };

    const handleRemoveItem = async (newItem) => {
        const item = carts.find((item) => item.itemId === newItem.itemId)
        if (item) {
            await removeFromCart(item.cartId)
        }
        setOrderItems((prevItems) => prevItems.filter((item) => item.itemId !== newItem.itemId));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Place Your Order
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {isLoading ? (
                <CircularProgress />
            ) : (
                // <Grid container spacing={3}>
                //     {/* Display items in Material UI cards */}
                //     {processedItems.map((item) => (
                //         <Grid item xs={12} sm={6} md={4} key={item.itemId}>
                //             <Card variant="outlined">
                //                 <CardContent>
                //                     <Typography variant="h6" component="div">
                //                         {item.itemName}
                //                     </Typography>
                //                     <Typography variant="body2" color="textSecondary">
                //                         Original Price: Rs. {(item.totalPrice ?? 0).toFixed(2)}
                //                     </Typography>
                //                     <Typography variant="body2" color="primary">
                //                         Discount: Rs. {(item.discount ?? 0).toFixed(2)}
                //                     </Typography>
                //                     <Typography variant="body2" color="textSecondary">
                //                         Quantity: {item.orderQuantity}
                //                     </Typography>
                //                     <Box display="flex" alignItems="center">
                //                         <IconButton
                //                             color="primary"
                //                             onClick={() => handleDecreaseQuantity(item.itemId)}
                //                         >
                //                             <RemoveIcon />
                //                         </IconButton>
                //                         <Typography variant="body2">{item.orderQuantity}</Typography>
                //                         <IconButton
                //                             color="primary"
                //                             onClick={() => handleIncreaseQuantity(item.itemId)}
                //                         >
                //                             <AddIcon />
                //                         </IconButton>
                //                         <IconButton
                //                             color="secondary"
                //                             onClick={() => handleRemoveItem(item)}
                //                             sx={{ ml: 2 }}
                //                         >
                //                             <DeleteIcon />
                //                         </IconButton>
                //                     </Box>
                //                 </CardContent>
                //             </Card>
                //         </Grid>
                //     ))}
                // </Grid>
                <Grid container spacing={3}>
                    {/* Display items in Material UI cards */}
                    {processedItems.map((item) => (
                        <Grid item xs={12} sm={6} md={3} key={item.itemId}>
                            <Card variant="outlined" className='d-flex'>
                                {/* style={{ display: 'flex' }} */}
                                <CardContent>
                                    {/* <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.imagePath} // Use the imagePath from the item
                                        alt={item.itemName}
                                    /> */}
                                    <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                                        {item.itemName}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Original Price: Rs. {(item.totalPrice ?? 0).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="primary">
                                        Discount: Rs. {(item.discount ?? 0).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Quantity: {item.orderQuantity}
                                    </Typography>
                                    <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleDecreaseQuantity(item.itemId)}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography variant="body2">{item.orderQuantity}</Typography>
                                        <IconButton
                                            color="primary"
                                            onClick={() => handleIncreaseQuantity(item.itemId)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            color="secondary"
                                            onClick={() => handleRemoveItem(item)}
                                            sx={{ ml: 2 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.imagePath} // Use the imagePath from the item
                                    alt={item.itemName}
                                />
                            </Card>
                        </Grid>
                    ))}
                </Grid>

            )}

            <Box sx={{ mt: 4 }}>


                {processedItems.length > 0 ? <>
                    {shippingAddresses.length > 0 ? (
                        <FormControl fullWidth sx={{ pt: 1 }}>
                            <InputLabel id="shipping-address-label">Select Shipping Address</InputLabel>
                            <Select
                                labelId="shipping-address-label"
                                value={selectedAddress}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                            >
                                {shippingAddresses.map((address, index) => (
                                    <MenuItem key={index} value={address.shippingAddress}>
                                        {address.shippingAddress}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : (
                        <TextField
                            label="Shipping Address"
                            fullWidth
                            multiline
                            rows={3}
                            value={customAddress}
                            onChange={(e) => setCustomAddress(e.target.value)}
                            error={!!error && !customAddress.trim()}
                            helperText={error && !customAddress.trim() ? error : ''}
                        />
                    )}

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Total Price: Rs. {totalPrice.toFixed(2)}
                        </Typography>
                        <Typography variant="body2" color="success.main" sx={{ mb: 3 }}>
                            Total Discount: Rs. {totalDiscount.toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </Button>
                    </Box></>
                    :
                    <>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="body1" color="textSecondary">
                                No Items are present in Cart to Order.
                            </Typography>
                        </Box>
                    </>
                }
            </Box>
            {/* {processedItems.length > 0 ? <>

                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Total Price: Rs. {totalPrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="success.main" sx={{ mb: 3 }}>
                        Total Discount: Rs. {totalDiscount.toFixed(2)}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handlePlaceOrder}
                    >
                        Place Order
                    </Button>
                </Box></>
                :
                <>
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="body1" color="textSecondary">
                            Add Items to Cart to Order.
                        </Typography>
                    </Box>
                </>
            } */}

            {/* Confirmation Dialog */}
            <Dialog open={openConfirmDialog} onClose={handleCancelConfirmation}>
                <DialogTitle>Confirm Order</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="textSecondary">
                        Are you sure you want to place this order? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelConfirmation} color="primary">
                        No
                    </Button>
                    <Button onClick={handleConfirmOrder} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Success Modal */}
            <Dialog open={openModal} onClose={handleCloseModal}>
                <DialogTitle>Order Placed Successfully</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="textSecondary">
                        Your order has been successfully placed! You can now view it in your orders.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PlaceOrder;
