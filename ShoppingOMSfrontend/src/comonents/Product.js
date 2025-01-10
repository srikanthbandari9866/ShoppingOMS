import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ProductItem from './ProductItem';
import PlaceOrder from './PlaceOrder';
import { useNavigate } from 'react-router-dom';

const Products = ({ filteredProducts, wishlists, addToWishlist, removeFromWishlist, carts, addToCart, isWishlist }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [orderProduct, setOrderProduct] = useState(null);
    const navigate = useNavigate()

    const handleAddToCart = async (product) => {
        if (!carts.find((item) => item.itemId === product.itemId)) {
            await addToCart(product.itemId)
            console.log(`${product.itemName} added to cart.`);
        } else {
            console.log(`${product.itemName} is already in the cart.`);
        }
    };
    const handleGoToCart = async (product) => {
        if (carts.find((item) => item.itemId === product.itemId)) {
            navigate('/carts', { state: { carts } })
        } else {
            console.log(`Error moving to cart`);
        }
    }

    const handleAddToWishlist = async (product) => {
        if (!wishlists.find((item) => item.itemId === product.itemId)) {
            await addToWishlist(product.itemId)
            console.log(`${product.itemName} added to wishlist.`);
        } else {
            console.log(`${product.itemName} is already in the wishlist.`);
        }
    };
    const handleRemoveWishlist = async (product) => {
        console.log(wishlists)
        console.log(product)
        if (wishlists.find((item) => item.wishlistId === product.wishlistId)) {
            await removeFromWishlist(product.wishlistId)
            console.log(`${product.wishlistId} ${product.itemId} ${product.itemName} removed from wishlist.`);
        }
        else if (wishlists.find((item) => item.itemId === product.itemId)) {
            const item = wishlists.find((item) => item.itemId === product.itemId)
            await removeFromWishlist(item.wishlistId)
            console.log(`${product.wishlistId} ${product.itemId} ${product.itemName} removed from wishlist.`);
        }
        else {
            console.log(`${product.itemName} is already removed from the wishlist.`);
            // console.log(`${product.itemName} is already in the wishlist.`);
        }
    };
    // const handleAddToWishlist = (product) => {
    //     if (!wishlist.find((item) => item.itemId === product.itemId)) {
    //         setWishlist((prevWishlist) => [...prevWishlist, product]);
    //         console.log(`${product.itemName} added to wishlist.`);
    //     } else {
    //         console.log(`${product.itemName} is already in the wishlist.`);
    //     }
    // };

    const handlePlaceOrder = async (product) => {
        // await handleAddToCart(product)
        // Set the selected product in state
        product.itemCount = 1;  // Initialize item count
        console.log('In product page with product: ', product)
        navigate("/placeorder", { state: { product } });
        // navigate("/placeorder");
    };
    return (
        <Box sx={{ p: 3 }}>
            {filteredProducts.length > 0 ? (
                <Grid container spacing={2}>
                    {filteredProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.itemId}>
                            <ProductItem
                                product={product}
                                onAddToCart={handleAddToCart}
                                onGoToCart={handleGoToCart}
                                onAddToWishlist={handleAddToWishlist}
                                onRemoveWishlist={handleRemoveWishlist}
                                onPlaceOrder={handlePlaceOrder}
                                isWishlist={isWishlist}
                                wishlists={wishlists}
                                carts={carts}
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h6" color="textSecondary" align="center">
                    No products match your criteria.
                </Typography>
            )}
        </Box>
    );
};

export default Products;
