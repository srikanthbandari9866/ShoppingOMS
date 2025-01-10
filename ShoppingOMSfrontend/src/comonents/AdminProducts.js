// import React, { useContext, useState } from 'react';
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TextField } from '@mui/material';
// import { ProductContext } from '../context/ProductContext';
// import AdminAddEditProduct from './AdminAddEditProduct';

// const AdminProducts = () => {
//     const { products, categories, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
//     const [selectedCategory, setSelectedCategory] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);

//     // Filter products by category and search query
//     const filteredProducts = products
//         .filter((product) =>
//             selectedCategory ? product.categoryId === selectedCategory : true
//         )
//         .filter((product) =>
//             product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
//         );

//     // Function to get the category name by categoryId
//     const getCategoryName = (categoryId) => {
//         const category = categories.find((cat) => cat.categoryId === categoryId);
//         return category ? category.categoryName : 'Unknown Category';
//     };

//     const handleAddNewProduct = () => {
//         setSelectedProduct(null); // Clear any selected product for adding a new one
//         setOpenAddEditDialog(true);
//     };

//     return (
//         <div>
//             {/* Category filter */}
//             <Select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 displayEmpty
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mb: 2 }}
//             >
//                 <MenuItem value="">All Categories</MenuItem>
//                 {categories.map((category) => (
//                     <MenuItem key={category.categoryId} value={category.categoryId}>{category.categoryName}</MenuItem>
//                 ))}
//             </Select>

//             {/* Search input */}
//             <TextField
//                 label="Search by product name"
//                 variant="outlined"
//                 fullWidth
//                 sx={{ mb: 2 }}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//             />

//             {/* Add Product button */}
//             <Button variant="contained" color="primary" onClick={handleAddNewProduct} sx={{ mb: 2 }}>
//                 Add Product
//             </Button>

//             {/* Table of Products */}
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Image</TableCell>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Product Name</TableCell>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Category</TableCell>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Quantity</TableCell>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Price</TableCell>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Discount%</TableCell>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>IsActive</TableCell>
//                             <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {filteredProducts.map((product, index) => (
//                             <TableRow
//                                 key={product.itemId}
//                                 sx={{
//                                     '&:nth-of-type(even)': {
//                                         backgroundColor: '#f4f4f4', // Alternating row colors
//                                     },
//                                     '&:hover': {
//                                         backgroundColor: '#e3f2fd', // Hover effect for rows
//                                     },
//                                 }}
//                             >
//                                 <TableCell>
//                                     <img src={product.imagePath} height="50" width="50" alt={product.itemName} />
//                                 </TableCell>
//                                 <TableCell>{product.itemName}</TableCell>
//                                 <TableCell>{getCategoryName(product.categoryId)}</TableCell>
//                                 <TableCell>{product.quantity}</TableCell>
//                                 <TableCell>{product.price}</TableCell>
//                                 <TableCell>{product.discount}</TableCell>
//                                 <TableCell>{product.isActive ? 'Yes' : 'No'}</TableCell>
//                                 <TableCell>
//                                     <Button
//                                         variant="outlined"
//                                         color="primary"
//                                         onClick={() => {
//                                             setSelectedProduct(product);
//                                             setOpenAddEditDialog(true);
//                                         }}
//                                         sx={{ mr: 1 }}
//                                     >
//                                         Edit
//                                     </Button>
//                                     {/* <Button variant="outlined" color="secondary" onClick={() => deleteProduct(product.itemId)}>
//                                         Delete
//                                     </Button> */}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Add/Edit Product Dialog */}
//             <AdminAddEditProduct
//                 open={openAddEditDialog}
//                 onClose={() => setOpenAddEditDialog(false)}
//                 product={selectedProduct}
//                 addProduct={addProduct}
//                 updateProduct={updateProduct}
//                 categories={categories}
//             />
//         </div>
//     );
// };

// export default AdminProducts;


import React, { useContext, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TextField, TablePagination, Box } from '@mui/material';
import { ProductContext } from '../context/ProductContext';
import AdminAddEditProduct from './AdminAddEditProduct';

const AdminProducts = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [page, setPage] = useState(0); // Pagination page
    const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page

    // Filter products by category and search query
    const filteredProducts = products
        .filter((product) =>
            selectedCategory ? product.categoryId === selectedCategory : true
        )
        .filter((product) =>
            product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Function to get the category name by categoryId
    const getCategoryName = (categoryId) => {
        const category = categories.find((cat) => cat.categoryId === categoryId);
        return category ? category.categoryName : 'Unknown Category';
    };

    const handleAddNewProduct = () => {
        setSelectedProduct(null); // Clear any selected product for adding a new one
        setOpenAddEditDialog(true);
    };

    // Handle changes in pagination
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page when changing rows per page
    };

    return (
        <div>
            {/* Category filter */}
            <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                displayEmpty
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
            >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.categoryId} value={category.categoryId}>{category.categoryName}</MenuItem>
                ))}
            </Select>

            {/* Search input */}
            <TextField
                label="Search by product name"
                variant="outlined"
                fullWidth
                sx={{ mb: 1 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Add Product button */}
            <Button variant="contained" color="primary" onClick={handleAddNewProduct} sx={{ mb: 1 }}>
                Add Product
            </Button>

            {/* Table of Products */}
            <TableContainer component={Paper} sx={{ maxHeight: 450, }}>
                <Table sx={{ minWidth: 650 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Image</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Product Name</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Category</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Quantity</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Price</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Discount%</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>IsActive</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => (
                                <TableRow
                                    key={product.itemId}
                                    sx={{
                                        '&:nth-of-type(even)': {
                                            backgroundColor: '#f4f4f4', // Alternating row colors
                                        },
                                        '&:hover': {
                                            backgroundColor: '#e3f2fd', // Hover effect for rows
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <img src={product.imagePath} height="50" width="50" alt={product.itemName} />
                                    </TableCell>
                                    <TableCell>{product.itemName}</TableCell>
                                    <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.discount}</TableCell>
                                    <TableCell>{product.isActive ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                setSelectedProduct(product);
                                                setOpenAddEditDialog(true);
                                            }}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        {/* <Button variant="outlined" color="secondary" onClick={() => deleteProduct(product.itemId)}>
                                            Delete
                                        </Button> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Table Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>

            {/* Add/Edit Product Dialog */}
            <AdminAddEditProduct
                open={openAddEditDialog}
                onClose={() => setOpenAddEditDialog(false)}
                product={selectedProduct}
                addProduct={addProduct}
                updateProduct={updateProduct}
                categories={categories}
            />
        </div>
    );
};

export default AdminProducts;
