// import React, { useState, useEffect } from "react";
// import {
//     Button,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Modal,
//     Box,
//     Typography,
//     Paper,
//     TableSortLabel,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Snackbar,
//     Select,
//     MenuItem,
//     TablePagination, // Import TablePagination
// } from "@mui/material";
// import api from "../utils/api";

// const Actions = () => {
//     const [orders, setOrders] = useState([]);
//     const [openModal, setOpenModal] = useState(false);
//     const [selectedOrderItems, setSelectedOrderItems] = useState([]);
//     const [selectedOrder, setSelectedOrder] = useState(null);
//     const [orderDirection, setOrderDirection] = useState("asc");
//     const [orderBy, setOrderBy] = useState("date");
//     const [selectedStatusMap, setSelectedStatusMap] = useState({});
//     const [openDialog, setOpenDialog] = useState(false);
//     const [currentAction, setCurrentAction] = useState(null);
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [page, setPage] = useState(0); // Pagination state
//     const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page for pagination

//     useEffect(() => {
//         // Fetching orders from the API
//         api
//             .get(`/Orders`)
//             .then((response) => {
//                 setOrders(response.data);
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the orders!", error);
//             });
//     }, []);

//     const handleViewClick = (order) => {
//         setSelectedOrderItems(order.orderItems);
//         setSelectedOrder(order);
//         setOpenModal(true);
//     };

//     const handleAcceptClick = (order) => {
//         setCurrentAction("Update");
//         setOpenDialog(true);
//         setSelectedOrder(order);
//     };

//     const handleDialogClose = () => {
//         setOpenDialog(false);
//     };

//     const handleConfirmAction = async () => {
//         try {
//             const response = await api.put(`/Orders/update/${selectedOrder.orderId}/${selectedStatusMap[selectedOrder.orderId]}`);
//             if (response.data) {
//                 setOrders((prev) => prev.map((order) =>
//                     order.orderId === selectedOrder.orderId ? { ...order, ...response.data } : order
//                 ));
//                 setSnackbarMessage("Order status updated successfully!");
//             }
//         } catch (err) {
//             setSnackbarMessage("Something went wrong. Failed to update the order status.");
//         }
//         setOpenDialog(false);
//         setOpenSnackbar(true);
//     };

//     const handleRequestSort = (event, property) => {
//         const isAsc = orderBy === property && orderDirection === "asc";
//         setOrderBy(property);
//         setOrderDirection(isAsc ? "desc" : "asc");
//     };

//     const sortOrders = (orders) => {
//         const comparator = (a, b) => {
//             if (orderBy === "date") {
//                 const dateA = new Date(a.date);
//                 const dateB = new Date(b.date);
//                 return orderDirection === "asc" ? dateA - dateB : dateB - dateA;
//             }
//             return 0;
//         };
//         return orders.sort(comparator);
//     };

//     const handleFilterChange = (orderId, status) => {
//         setSelectedStatusMap((prev) => ({
//             ...prev,
//             [orderId]: status, // Update status for the specific order
//         }));
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0); // Reset to first page
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <Typography variant="h4" gutterBottom>
//                 Orders List
//             </Typography>

//             {orders.length === 0 ? (
//                 <Typography variant="h6" color="textSecondary">
//                     No pending orders yet.
//                 </Typography>
//             ) : (
//                 <TableContainer component={Paper} sx={{ maxHeight: 400, position: 'relative' }}>
//                     <Table aria-label="orders table">
//                         <TableHead>
//                             <TableRow sx={{ backgroundColor: "#3f51b5" }}>
//                                 <TableCell sx={{ color: "white" }}>
//                                     Date
//                                     <TableSortLabel
//                                         active={orderBy === "date"}
//                                         direction={orderDirection}
//                                         onClick={(event) => handleRequestSort(event, "date")}
//                                         sx={{ color: "white" }}
//                                     />
//                                 </TableCell>
//                                 <TableCell sx={{ color: "white" }}>Order ID</TableCell>
//                                 <TableCell sx={{ color: "white" }}>User Name</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Total Items</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Total Price</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Discount</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Order Status</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Shipping Address</TableCell>
//                                 <TableCell sx={{ color: "white" }}>Actions</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {sortOrders(orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((order) => (
//                                 <TableRow key={order.orderId}>
//                                     <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
//                                     <TableCell>{order.orderId}</TableCell>
//                                     <TableCell>{order.userName}</TableCell>
//                                     <TableCell>{order.orderTotal}</TableCell>
//                                     <TableCell>{order.totalPrice}</TableCell>
//                                     <TableCell>{order.discount}</TableCell>
//                                     <TableCell>{order.orderStatus}</TableCell>
//                                     <TableCell>{order.shippingAddress}</TableCell>
//                                     <TableCell>
//                                         <Button
//                                             variant="contained"
//                                             color="primary"
//                                             onClick={() => handleViewClick(order)}
//                                             style={{ marginRight: "10px" }}
//                                         >
//                                             View
//                                         </Button>
//                                         {
//                                             (order.orderStatus === 'ACCEPTED') ? <><Select value={selectedStatusMap[order.orderId] || order.orderStatus} onChange={(e) => handleFilterChange(order.orderId, e.target.value)}>
//                                                 <MenuItem value="DELIVERED">Delivered</MenuItem>
//                                                 <MenuItem value="SHIPPED">Shipped</MenuItem>
//                                             </Select>
//                                                 <Button
//                                                     variant="contained"
//                                                     color="success"
//                                                     onClick={() => handleAcceptClick(order)}
//                                                     style={{ marginRight: "10px", marginLeft: '10px' }}
//                                                 >
//                                                     Modify
//                                                 </Button></> :
//                                                 (order.orderStatus === 'SHIPPED') ? <><Select value={selectedStatusMap[order.orderId] || order.orderStatus} onChange={(e) => handleFilterChange(order.orderId, e.target.value)}>
//                                                     <MenuItem value="DELIVERED">Shipped</MenuItem>
//                                                 </Select>
//                                                     <Button
//                                                         variant="contained"
//                                                         color="success"
//                                                         onClick={() => handleAcceptClick(order)}
//                                                         style={{ marginRight: "10px", marginLeft: '10px' }}
//                                                     >
//                                                         Modify
//                                                     </Button></> :
//                                                     (order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && order.orderStatus !== 'NOT ACCEPTED') ? <><Select value={selectedStatusMap[order.orderId] || ''} onChange={(e) => handleFilterChange(order.orderId, e.target.value)}
//                                                     >
//                                                         <MenuItem value="ACCEPTED">Accepted</MenuItem>
//                                                         <MenuItem value="NOT ACCEPTED">Not Accepted</MenuItem>
//                                                     </Select>
//                                                         <Button
//                                                             variant="contained"
//                                                             color="success"
//                                                             onClick={() => handleAcceptClick(order)}
//                                                             style={{ marginRight: "10px", marginLeft: '10px' }}
//                                                         >
//                                                             Modify
//                                                         </Button></> : null
//                                         }
//                                     </TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                     {/* Fixed bottom pagination */}
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 25]}
//                         component="div"
//                         count={orders.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         sx={{
//                             position: "absolute",
//                             bottom: 0,
//                             width: "100%",
//                             backgroundColor: "#fff",
//                         }}
//                     />
//                 </TableContainer>
//             )}

//             {/* View Modal */}
//             <Modal
//                 open={openModal}
//                 onClose={() => setOpenModal(false)}
//                 aria-labelledby="order-items-modal"
//                 aria-describedby="order-items-description"
//             >
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: 400,
//                         bgcolor: "background.paper",
//                         border: "2px solid #000",
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <Typography variant="h6" gutterBottom>
//                         Order Items for Order ID: {selectedOrder?.orderId}
//                     </Typography>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Item Name</TableCell>
//                                 <TableCell>Quantity</TableCell>
//                                 <TableCell>Discount</TableCell>
//                                 <TableCell>Price</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {selectedOrderItems.map((item, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell>{item.itemName}</TableCell>
//                                     <TableCell>{item.orderQuantity}</TableCell>
//                                     <TableCell>{item.discount}</TableCell>
//                                     <TableCell>{item.totalPrice}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                     <Button onClick={() => setOpenModal(false)} variant="contained" color="secondary" sx={{ marginTop: "20px" }}>
//                         Close
//                     </Button>
//                 </Box>
//             </Modal>

//             {/* Confirmation Dialog */}
//             <Dialog open={openDialog} onClose={handleDialogClose}>
//                 <DialogTitle>{`Are you sure you want to Update this order?`}</DialogTitle>
//                 <DialogContent>
//                     <Typography variant="body1">
//                         Please confirm if you want to Update the order with ID: {selectedOrder?.orderId}.
//                     </Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleDialogClose} color="secondary">
//                         No
//                     </Button>
//                     <Button onClick={handleConfirmAction} color="primary">
//                         Yes
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar for Success/Failure */}
//             <Snackbar
//                 open={openSnackbar}
//                 autoHideDuration={6000}
//                 onClose={() => setOpenSnackbar(false)}
//                 message={snackbarMessage}
//                 severity={snackbarMessage === "Order status updated successfully!" ? "success" : "error"}
//             />
//         </div>
//     );
// };

// export default Actions;
import React, { useState, useEffect } from "react";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    Box,
    Typography,
    Paper,
    TableSortLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Select,
    MenuItem,
    TablePagination, // Import TablePagination for pagination
} from "@mui/material";
import api from "../utils/api";

const Actions = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]); // To store filtered orders
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderDirection, setOrderDirection] = useState("asc");
    const [orderBy, setOrderBy] = useState("date");
    const [selectedStatusMap, setSelectedStatusMap] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [currentAction, setCurrentAction] = useState(null); // Accept or Reject action
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
    const [orderStatusFilter, setOrderStatusFilter] = useState(""); // To track the selected order status filter

    useEffect(() => {
        api
            .get("/Orders")
            .then((response) => {
                setOrders(response.data);
                setFilteredOrders(response.data); // Initially show all orders
            })
            .catch((error) => {
                console.error("There was an error fetching the orders!", error);
            });
    }, []);

    useEffect(() => {
        // Filter orders based on selected status
        if (orderStatusFilter) {
            setFilteredOrders(orders.filter((order) => order.orderStatus === orderStatusFilter));
        } else {
            setFilteredOrders(orders); // Show all orders if no filter is selected
        }
    }, [orderStatusFilter, orders]);

    const handleViewClick = (order) => {
        setSelectedOrderItems(order.orderItems);
        setSelectedOrder(order);
        setOpenModal(true);
    };

    const handleAcceptClick = (order) => {
        if (!selectedStatusMap[order.orderId]) {
            setSnackbarMessage("Please select a status before proceeding!");
            setOpenSnackbar(true);
            return; // Prevent modification if no status is selected
        }

        setCurrentAction("Update");
        setOpenDialog(true);
        setSelectedOrder(order);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleConfirmAction = async () => {
        try {
            const response = await api.put(`/Orders/update/${selectedOrder.orderId}/${selectedStatusMap[selectedOrder.orderId]}`);
            if (response.data) {
                setOrders((prev) => prev.map((order) =>
                    order.orderId === selectedOrder.orderId ? { ...order, ...response.data } : order
                ));
                setSnackbarMessage("Order status updated successfully!");
            }
        } catch (err) {
            setSnackbarMessage("Something went wrong. Failed to update the order status.");
        }
        setOpenDialog(false);
        setOpenSnackbar(true);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && orderDirection === "asc";
        setOrderBy(property);
        setOrderDirection(isAsc ? "desc" : "asc");
    };

    const sortOrders = (orders) => {
        const comparator = (a, b) => {
            if (orderBy === "date") {
                const dateA = new Date(a.date); // Convert date string to Date object
                const dateB = new Date(b.date); // Convert date string to Date object
                return orderDirection === "asc" ? dateA - dateB : dateB - dateA; // Compare dates
            }
            return 0;
        };
        return orders.sort(comparator);
    };

    const handleFilterChange = (orderId, status) => {
        setSelectedStatusMap((prev) => ({
            ...prev,
            [orderId]: status, // Update status for the specific order
        }));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset page when rows per page changes
    };

    // Sort and paginate orders here
    const sortedOrders = sortOrders(filteredOrders);
    const paginatedOrders = sortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ padding: "20px" }}>
            <Typography variant="h4" gutterBottom>
                Orders List
            </Typography>

            {/* Order Status Filter */}
            <Select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                displayEmpty
                fullWidth
                variant="outlined"
                style={{ marginBottom: "20px" }}
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                <MenuItem value="ACCEPTED">Accepted</MenuItem>
                <MenuItem value="PLACED">Placed</MenuItem>
                <MenuItem value="SHIPPED">Shipped</MenuItem>
                <MenuItem value="DELIVERED">Delivered</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
                <MenuItem value="NOT ACCEPTED">Not Accepted</MenuItem>
            </Select>

            {filteredOrders.length === 0 ? (
                <Typography variant="h6" color="textSecondary">
                    No orders found for the selected status.
                </Typography>
            ) : (
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#3f51b5" }}>
                                    <TableCell sx={{ color: "white" }}>
                                        Date
                                        <TableSortLabel
                                            active={orderBy === "date"}
                                            direction={orderDirection}
                                            onClick={(event) => handleRequestSort(event, "date")}
                                            sx={{ color: "white" }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ color: "white" }}>Order ID</TableCell>
                                    <TableCell sx={{ color: "white" }}>User Name</TableCell>
                                    <TableCell sx={{ color: "white" }}>Total Items</TableCell>
                                    <TableCell sx={{ color: "white" }}>Total Price</TableCell>
                                    <TableCell sx={{ color: "white" }}>Discount</TableCell>
                                    <TableCell sx={{ color: "white" }}>Order Status</TableCell>
                                    <TableCell sx={{ color: "white" }}>Shipping Address</TableCell>
                                    <TableCell sx={{ color: "white" }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedOrders.map((order) => (
                                    <TableRow key={order.orderId}>
                                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>{order.userName}</TableCell>
                                        <TableCell>{order.orderTotal}</TableCell>
                                        <TableCell>{order.totalPrice}</TableCell>
                                        <TableCell>{order.discount}</TableCell>
                                        <TableCell>{order.orderStatus}</TableCell>
                                        <TableCell>{order.shippingAddress}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleViewClick(order)}
                                                style={{ marginRight: "10px" }}
                                            >
                                                View
                                            </Button>
                                            {
                                                (order.orderStatus === 'ACCEPTED') ? <><Select value={selectedStatusMap[order.orderId] || order.orderStatus} onChange={(e) => handleFilterChange(order.orderId, e.target.value)}>
                                                    {/* <MenuItem value="DELIVERED">Delivered</MenuItem> */}
                                                    <MenuItem value="SHIPPED">Shipped</MenuItem>
                                                </Select>
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        onClick={() => handleAcceptClick(order)}
                                                        style={{ marginRight: "10px", marginLeft: '10px' }}
                                                    >
                                                        Modify
                                                    </Button></> :
                                                    (order.orderStatus === 'SHIPPED') ? <><Select value={selectedStatusMap[order.orderId] || order.orderStatus} onChange={(e) => handleFilterChange(order.orderId, e.target.value)} >
                                                        <MenuItem value="DELIVERED">Delivered</MenuItem>
                                                    </Select>
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => handleAcceptClick(order)}
                                                            style={{ marginRight: "10px", marginLeft: '10px' }}
                                                        >
                                                            Modify
                                                        </Button></> :
                                                        (order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'DELIVERED' && order.orderStatus !== 'NOT ACCEPTED') ? <><Select value={selectedStatusMap[order.orderId] || ''} onChange={(e) => handleFilterChange(order.orderId, e.target.value)} >
                                                            <MenuItem value="ACCEPTED">Accepted</MenuItem>
                                                            <MenuItem value="NOT ACCEPTED">Not Accepted</MenuItem>
                                                        </Select>
                                                            <Button
                                                                variant="contained"
                                                                color="success"
                                                                onClick={() => handleAcceptClick(order)}
                                                                style={{ marginRight: "10px", marginLeft: '10px' }}
                                                            >
                                                                Modify
                                                            </Button></> : null
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredOrders.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            {/* View Modal */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="order-items-modal"
                aria-describedby="order-items-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Order Items for Order ID: {selectedOrder?.orderId}
                    </Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Item Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Discount</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedOrderItems.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.itemName}</TableCell>
                                    <TableCell>{item.orderQuantity}</TableCell>
                                    <TableCell>{item.discount}</TableCell>
                                    <TableCell>{item.totalPrice}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button onClick={() => setOpenModal(false)} variant="contained" color="secondary" sx={{ marginTop: "20px" }}>
                        Close
                    </Button>
                </Box>
            </Modal>

            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Are you sure you want to Update this order?</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Please confirm if you want to Update the order with ID: {selectedOrder?.orderId}.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                        No
                    </Button>
                    <Button onClick={handleConfirmAction} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Success/Failure */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message={snackbarMessage}
                severity={snackbarMessage === "Order status updated successfully!" ? "success" : "error"}
            />
        </div>
    );
};

export default Actions;
