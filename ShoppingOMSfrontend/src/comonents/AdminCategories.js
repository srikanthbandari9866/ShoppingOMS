// import React, { useContext, useState } from 'react';
// import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { ProductContext } from '../context/ProductContext';
// import AdminAddEditCategory from './AdminAddEditCategory';

// const AdminCategories = () => {
//     const { categories, addCategory, updateCategory, deleteCategory } = useContext(ProductContext);
//     const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
//     const [selectedCategory, setSelectedCategory] = useState(null);


//     const handleAddCategory = () => {
//         setSelectedCategory(null);  // Reset the selectedCategory before opening the dialog for adding new category
//         setOpenAddEditDialog(true);
//     };

//     const handleCloseDialog = () => {
//         setSelectedCategory(null);  // Reset selectedCategory when closing the dialog
//         setOpenAddEditDialog(false);
//     };

//     return (
//         <div style={{ width: '50%' }}>
//             <Button variant="contained" color="primary" onClick={handleAddCategory} sx={{ mb: 2 }}>Add Category</Button>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Category Name</TableCell>
//                             <TableCell>IsActive</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {categories.map((category) => (
//                             <TableRow key={category.categoryId}>
//                                 <TableCell>{category.categoryName}</TableCell>
//                                 <TableCell>{category.isActive}</TableCell>
//                                 <TableCell>
//                                     <Button onClick={() => {
//                                         setSelectedCategory(category);
//                                         setOpenAddEditDialog(true);
//                                     }}>Edit</Button>
//                                     {/* <Button onClick={() => deleteCategory(category.categoryId)}>Delete</Button> */}
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <AdminAddEditCategory
//                 open={openAddEditDialog}
//                 onClose={handleCloseDialog}
//                 category={selectedCategory}
//                 addCategory={addCategory}
//                 updateCategory={updateCategory}
//             />
//         </div>
//     );
// };

// export default AdminCategories;


import React, { useContext, useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box } from '@mui/material';
import { ProductContext } from '../context/ProductContext';
import AdminAddEditCategory from './AdminAddEditCategory';

const AdminCategories = () => {
    const { categories, addCategory, updateCategory, deleteCategory } = useContext(ProductContext);
    const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Pagination state
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleAddCategory = () => {
        setSelectedCategory(null);  // Reset the selectedCategory before opening the dialog for adding new category
        setOpenAddEditDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedCategory(null);  // Reset selectedCategory when closing the dialog
        setOpenAddEditDialog(false);
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
        <div style={{ width: '80%' }}>
            <Button variant="contained" color="primary" onClick={handleAddCategory} sx={{ mb: 2 }}>
                Add Category
            </Button>

            {/* Table of Categories */}
            <TableContainer component={Paper} sx={{ maxHeight: 400, mb: 2 }}>
                <Table sx={{ minWidth: 650 }} stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Category Name</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>IsActive</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((category) => (
                                <TableRow
                                    key={category.categoryId}
                                    sx={{
                                        '&:nth-of-type(even)': {
                                            backgroundColor: '#f4f4f4', // Alternating row colors
                                        },
                                        '&:hover': {
                                            backgroundColor: '#e3f2fd', // Hover effect for rows
                                        },
                                    }}
                                >
                                    <TableCell>{category.categoryName}</TableCell>
                                    <TableCell>{category.isActive ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                setSelectedCategory(category);
                                                setOpenAddEditDialog(true);
                                            }}
                                            sx={{ mr: 1 }}
                                        >
                                            Edit
                                        </Button>
                                        {/* <Button onClick={() => deleteCategory(category.categoryId)}>Delete</Button> */}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination at the bottom */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={categories.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>

            {/* Add/Edit Category Dialog */}
            <AdminAddEditCategory
                open={openAddEditDialog}
                onClose={handleCloseDialog}
                category={selectedCategory}
                addCategory={addCategory}
                updateCategory={updateCategory}
            />
        </div>
    );
};

export default AdminCategories;
