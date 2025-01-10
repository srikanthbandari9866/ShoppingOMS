
import React, { useState, useEffect, useContext } from 'react';
import {
    Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, IconButton, Button, Dialog, Typography,
    DialogActions, DialogContent, DialogTitle, Alert, Select, MenuItem, FormControl, InputLabel, TablePagination
} from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authData, updateBalance } = useContext(AuthContext);
    const userId = authData?.user?.userId;
    const balance = authData?.user?.balance;

    const [orderDirection, setOrderDirection] = useState('desc');
    const [orderBy, setOrderBy] = useState('date');
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchOrders = async () => {
        if (!userId) {
            setError('User not logged in');
            setLoading(false);
            return;
        }

        try {
            const response = await api.get(`/Orders/getByUserId/${userId}`);
            if (Array.isArray(response.data)) {
                setOrders(response.data);
                setFilteredOrders(response.data);
            } else {
                setOrders([]);
                setFilteredOrders([]);
            }
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Failed to load orders.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchOrders();
        }
    }, [userId]);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleViewDetails = (orderId) => {
        const order = orders.find((order) => order.orderId === orderId);
        setOrderDetails(order);
        setOpenDetailsDialog(true);
    };

    const handleCancelOrder = async () => {
        try {
            console.log('orders authData: ', authData)
            const status = 'CANCELLED';
            const response = await api.put(`/Orders/update/${selectedOrderId}/${status}`);
            if (response.data) {
                setOrders((prev) => prev.map((order) =>
                    order.orderId === selectedOrderId ? { ...order, ...response.data } : order
                ));
                setFilteredOrders((prev) => prev.map((order) =>
                    order.orderId === selectedOrderId ? { ...order, ...response.data } : order
                ));
                const order = orders.find((order) => order.orderId === selectedOrderId);
                await updateBalance(balance + order.totalPrice)
                console.log('orders authData: ', authData)
            }
            setOpenCancelDialog(false);
        } catch (err) {
            setError('Failed to cancel the order.');
        }
    };

    const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false);
    };

    const handleCloseDetailsDialog = () => {
        setOpenDetailsDialog(false);
    };

    const handleFilterChange = (status) => {
        setSelectedStatus(status);
        if (status === 'ALL') {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.orderStatus === status));
        }
    };

    const sortOrders = (array, comparator) => array.sort(comparator);

    const comparator = (a, b) => {
        if (orderBy === 'date') {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return orderDirection === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
    };

    const sortedOrders = sortOrders([...filteredOrders], comparator);

    const getStatusColor = (status) => {
        switch (status) {
            case 'CANCELLED':
            case 'NOT ACCEPTED':
                return '#f44336'; // Red
            case 'ACCEPTED':
            case 'PLACED':
                return '#388e3c'; // Green
            case 'DELIVERED':
                return '#2d42ec'; // Blue
            default:
                return '#ff9800'; // Orange
        }
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Orders
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <FormControl fullWidth sx={{ mb: 2, pt: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select value={selectedStatus} onChange={(e) => handleFilterChange(e.target.value)}>
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="CANCELLED">Cancelled</MenuItem>
                    <MenuItem value="ACCEPTED">Accepted</MenuItem>
                    <MenuItem value="NOT ACCEPTED">Not Accepted</MenuItem>
                    <MenuItem value="PLACED">Placed</MenuItem>
                    <MenuItem value="DELIVERED">Delivered</MenuItem>
                    <MenuItem value="SHIPPED">Shipped</MenuItem>
                </Select>
            </FormControl>

            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <>
                    <TableContainer sx={{ maxHeight: 500 }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        <TableSortLabel
                                            active={orderBy === 'date'}
                                            direction={orderDirection}
                                            onClick={() => handleRequestSort('date')}
                                        >
                                            Date
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        Order ID
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        User Name
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        Total Items
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        Total Price
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        Discount
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        Order Status
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        Shipping Address
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#651ca4', color: 'white' }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                                    <TableRow key={order.orderId}>
                                        <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.userName}</TableCell>
                                        <TableCell>{order.orderTotal}</TableCell>
                                        <TableCell>{order.totalPrice}</TableCell>
                                        <TableCell>Rs. {order.discount.toFixed(2)}</TableCell>
                                        <TableCell
                                            sx={{
                                                color: getStatusColor(order.orderStatus),
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {order.orderStatus}
                                        </TableCell>
                                        <TableCell>{order.shippingAddress}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => handleViewDetails(order.orderId)}>
                                                <VisibilityIcon />
                                            </IconButton>

                                            {order.orderStatus !== 'DELIVERED' &&
                                                order.orderStatus !== 'CANCELLED' &&
                                                order.orderStatus !== 'NOT ACCEPTED' && (
                                                    <IconButton
                                                        color="secondary"
                                                        onClick={() => {
                                                            setSelectedOrderId(order.orderId);
                                                            setOpenCancelDialog(true);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {sortedOrders.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center">
                                            No orders found for the selected status.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={sortedOrders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>
            )}

            {/* Order Details Dialog */}
            <Dialog open={openDetailsDialog} onClose={handleCloseDetailsDialog}>
                <DialogTitle>Order Details</DialogTitle>
                <DialogContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#1976d2' }}>
                                    <TableCell sx={{ color: 'white' }}>Item Name</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Price</TableCell>
                                    <TableCell sx={{ color: 'white' }}>Discount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetails?.orderItems?.map((item) => (
                                    <TableRow key={item.itemId}>
                                        <TableCell>{item.itemName}</TableCell>
                                        <TableCell>{item.orderQuantity}</TableCell>
                                        <TableCell>Rs. {(item.totalPrice ?? 0).toFixed(2)}</TableCell>
                                        <TableCell>Rs. {(item.discount ?? 0).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDetailsDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Cancel Order Confirmation Dialog */}
            <Dialog open={openCancelDialog} onClose={handleCloseCancelDialog}>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogContent>
                    Are you sure you want to cancel this order? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancelDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={handleCancelOrder} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Orders;
