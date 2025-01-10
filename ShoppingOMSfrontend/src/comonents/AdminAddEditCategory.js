import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Select, MenuItem } from '@mui/material';

const AdminAddEditCategory = ({ open, onClose, category, addCategory, updateCategory }) => {
    const [categoryName, setCategoryName] = useState('');
    const [isActive, setIsActive] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {

        if (category) {
            // If category is provided (for editing), set the values to the form fields
            setCategoryName(category.categoryName);
            setIsActive(category.isActive);
        } else {
            // If no category is selected (for adding new category), reset the form fields
            setCategoryName('');
            setIsActive(1); // Default value for new category
        }
    }, [category]);  // Reset the fields whenever `category` changes

    const handleSave = async () => {
        // Basic validation for category name
        if (categoryName.trim() === '') {
            setError('Category name is required.');
            return; // Don't proceed with saving if validation fails
        }
        if (categoryName.length > 100) {
            setError('Category name cannot exceed 100 characters.');
            return; // Don't proceed with saving if validation fails
        }

        setError(''); // Reset error if validation passes
        const categoryData = { categoryName, isActive };
        if (category) {
            let updateddata = { categoryName, isActive }
            await updateCategory(category.categoryId, updateddata);
        } else {
            await addCategory(categoryData);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{category ? 'Edit Category' : 'Add Category'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    fullWidth
                    required
                    error={error ? true : false}
                    helperText={error}
                />
                <Select
                    value={isActive}
                    onChange={(e) => setIsActive(e.target.value)}
                    fullWidth
                    required
                >
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Cancel</Button>
                <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AdminAddEditCategory;
