

import React, { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Box,
    Divider,
    Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar = ({ categories, priceRanges, onFilterChange, onSortChange, sx }) => {
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [category, setCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    // const priceRanges = [
    //     { id: '0-100', label: '$0 - $100', min: 0, max: 100 },
    //     { id: '101-200', label: '$101 - $200', min: 101, max: 200 },
    //     { id: '201-300', label: '$201 - $300', min: 201, max: 300 },
    //     { id: '301-400', label: '$301 - $400', min: 301, max: 400 },
    //     { id: '401+', label: '$401+', min: 401, max: Infinity },
    // ];

    const handlePriceRangeChange = (rangeId) => {
        const updatedRanges = selectedPriceRanges.includes(rangeId)
            ? selectedPriceRanges.filter((id) => id !== rangeId)
            : [...selectedPriceRanges, rangeId];

        setSelectedPriceRanges(updatedRanges);
        onFilterChange({ type: 'priceRanges', value: updatedRanges });
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        onFilterChange({ type: 'category', value: event.target.value });
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
        onSortChange(event.target.value);
    };

    const handleClearAll = () => {
        // Reset local states
        setSelectedPriceRanges([]);
        setCategory('');
        setSortOrder('');

        // Notify parent to clear filters and sort
        onFilterChange({ type: 'priceRanges', value: [] });
        onFilterChange({ type: 'category', value: '' });
        onSortChange('');
    };

    const drawerWidth = 240;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                ...sx,
            }}
        >
            <Box p={2}>
                <Typography variant="h6">Filters</Typography>

                {/* Filter by Price Range */}
                <Box mt={2}>
                    <Typography variant="body2">Filter by Price Range</Typography>
                    <List>
                        {priceRanges.map((range) => (
                            <ListItem key={range.id} disablePadding>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={selectedPriceRanges.includes(range.id)}
                                            onChange={() => handlePriceRangeChange(range.id)}
                                        />
                                    }
                                    label={range.label}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>

                {/* Filter by Category */}
                <Box mt={2}>
                    <Typography variant="body2">Filter by Category</Typography>
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select value={category} onChange={handleCategoryChange} label="Category">
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories?.map((category) => (
                                <MenuItem key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Sort by Price */}
                <Box mt={2}>
                    <Typography variant="body2">Sort by Price</Typography>
                    <FormControl fullWidth>
                        <InputLabel>Sort</InputLabel>
                        <Select value={sortOrder} onChange={handleSortChange} label="Sort">
                            <MenuItem value="asc">Low to High</MenuItem>
                            <MenuItem value="desc">High to Low</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Divider />
                {/* Clear All Filters Button */}
                <Box mt={2}>
                    <Button variant="outlined" color="primary" startIcon={<DeleteIcon />} onClick={handleClearAll} fullWidth>
                        Clear All Filters
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default Sidebar;

