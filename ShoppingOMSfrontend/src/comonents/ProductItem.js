import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, CardMedia, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink, blue } from '@mui/material/colors';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


const ProductItem = ({ product, wishlists, carts, onAddToCart, onGoToCart, onAddToWishlist, onRemoveWishlist, onPlaceOrder, isWishlist }) => {
    const calculateDiscountedPrice = (price, discountPercentage) => {
        return price - (price * discountPercentage) / 100;
    };

    const discountedPrice = calculateDiscountedPrice(product.price, product.discount || 0);

    const isInCart = carts.some((item) => item.itemId === product.itemId);
    const isInWishlist = wishlists.some((item) => item.itemId === product.itemId);

    return (
        <Card sx={{ maxWidth: 345, m: 'auto' }}>
            <CardMedia
                component="img"
                height="200"
                image={product.imagePath || 'https://via.placeholder.com/200'} // Placeholder if no image
                alt={product.itemName}
                sx={{ p: 3 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {product.itemName}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="body1" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                        Rs. {product.price.toFixed(2)}
                    </Typography>
                    <Typography variant="body1" color="primary">
                        Rs. {discountedPrice.toFixed(2)}
                    </Typography>
                </Box>
                {product.discount > 0 && (
                    <Typography variant="body2" color="success.main">
                        Save {product.discount}%!
                    </Typography>
                )}
                {/* <Typography variant="body2" color="textSecondary">
                    Category: {product.categoryName || 'N/A'}
                </Typography> */}
            </CardContent>
            <CardActions>
                {isInCart ? (
                    <Button size="small" color="primary" variant="contained" onClick={() => onGoToCart(product)}>
                        Go to  <ShoppingCartOutlinedIcon />
                    </Button>
                ) : (
                    <Button size="small" color="primary" variant="outlined" onClick={() => onAddToCart(product)}>
                        Add to  <AddShoppingCartIcon sx={{ color: blue[500] }} />

                    </Button>
                )}
                {isWishlist !== false && (
                    <>
                        {isInWishlist ? (
                            <Button
                                size="small"
                                color="error"
                                onClick={() => onRemoveWishlist(product)}
                            >
                                {/* Remove from Wishlist */}
                                {/* <img src='./redheart.png' /> */}
                                <FavoriteIcon sx={{ color: pink[500] }} />
                            </Button>
                        ) : (
                            <Button size="small" color="" onClick={() => onAddToWishlist(product)}>
                                {/* Add to Wishlist */}
                                <FavoriteBorderIcon />
                            </Button>
                        )}
                    </>
                )}
                {isWishlist === false && (
                    <>
                        <Button
                            size="small"
                            color="error"
                            variant="outlined"
                            onClick={() => onRemoveWishlist(product)}
                        >
                            Remove
                        </Button>
                    </>
                )}
                <Button size="small" color="success" variant="outlined" onClick={() => onPlaceOrder(product)}>
                    Place Order
                </Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;
