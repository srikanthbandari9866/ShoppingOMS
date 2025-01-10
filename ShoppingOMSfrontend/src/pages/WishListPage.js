
import React, { useState, useContext } from 'react';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import Sidebar from '../comonents/SideBar';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';
import Products from '../comonents/Product';

const WishListPage = () => {
    const [filters, setFilters] = useState({});
    const [sortOrder, setSortOrder] = useState('');
    const { products, categories, addToWishlist, removeFromWishlist, wishlists, carts, addToCart } = useContext(ProductContext);
    const { authData } = useContext(AuthContext);
    let role = authData?.user?.role || null;

    const handleFilterChange = (filter) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filter.type]: filter.value }));
    };

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const priceRanges = [
        { id: '0-100', label: 'Rs. 0 - Rs. 100', min: 0, max: 100 },
        { id: '101-200', label: 'Rs. 101 - Rs. 200', min: 101, max: 200 },
        { id: '201-300', label: 'Rs. 201 - Rs. 300', min: 201, max: 300 },
        // { id: '301-400', label: '$301 - $400', min: 301, max: 400 },
        { id: '301+', label: 'Rs. 301 and above', min: 301, max: Infinity },
    ];

    const applyFilters = () => {

        let filteredProducts = [...wishlists];
        filteredProducts = filteredProducts.filter(product => product.isActive === 1)
        // if (role === 'User') {
        //     filteredProducts = filteredProducts.filter(product => product.isActive === 1)
        // }
        // Filter by price ranges
        if (filters.priceRanges?.length > 0) {
            filteredProducts = filteredProducts.filter((product) =>
                filters.priceRanges.some((rangeId) => {
                    const range = priceRanges.find((r) => r.id === rangeId);
                    return product.price >= range.min && product.price <= range.max;
                })
            )
        }

        //Sort by category
        if (filters.category && filters.category != '') {
            filteredProducts = filteredProducts.filter(product => product.categoryId === filters.category)
        }
        // Sort by price
        if (sortOrder) {
            filteredProducts.sort((a, b) =>
                sortOrder === 'asc' ? a.price - b.price : b.price - a.price
            );
        }

        return filteredProducts;
    };

    const filteredProducts = applyFilters();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            {/* Sidebar */}
            <Sidebar
                categories={categories}
                priceRanges={priceRanges}
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        marginTop: '70px', // Add marginTop for spacing
                    },
                }}
            />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: `20px`,
                }}
            >
                <Products filteredProducts={filteredProducts} addToWishlist={addToWishlist} removeFromWishlist={removeFromWishlist}
                    wishlists={wishlists} carts={carts} addToCart={addToCart} isWishlist={false} />
            </Box>
        </Box>
    );
};

export default WishListPage;


