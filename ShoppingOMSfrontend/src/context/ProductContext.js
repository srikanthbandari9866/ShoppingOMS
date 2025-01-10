import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [wishlists, setWishlists] = useState([])
    const [carts, setCarts] = useState([])
    const { authData } = useContext(AuthContext)
    let userId = authData?.user?.userId || null
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch products and categories regardless of user authentication
                const [itemsResponse, categoriesResponse] = await Promise.all([
                    api.get('/Items'),
                    api.get('/Categories'),
                ]);

                setProducts(itemsResponse.data);
                setCategories(categoriesResponse.data);

                if (userId) {
                    // Fetch wishlists and carts only when the user is authenticated
                    const [wishlistResponse, cartResponse] = await Promise.all([
                        api.get(`/Wishlists/getByUserId/${userId}`),
                        api.get(`/Carts/getByUserId/${userId}`),
                    ]);

                    setWishlists(wishlistResponse.data);
                    setCarts(cartResponse.data);
                } else {
                    console.log('User ID is null. Skipping wishlist and cart fetch.');
                }
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [userId]);
    useEffect(() => {
        const fetchWishlists = async () => {
            if (userId) {
                try {
                    const response = await api.get(`/Wishlists/getByUserId/${userId}`);
                    setWishlists(response.data);
                } catch (error) {
                    console.error('Error fetching wishlists', error);
                }
            } else {
                console.log('User ID is null. Skipping wishlist fetch.');
            }
        };

        fetchWishlists();
    }, [userId]);
    useEffect(() => {
        const fetchCarts = async () => {
            if (userId) {
                try {
                    const response = await api.get(`/Carts/getByUserId/${userId}`);
                    setCarts(response.data);
                } catch (error) {
                    console.error('Error fetching carts', error);
                }
            } else {
                console.log('User ID is null. Skipping carts fetch.');
            }
        };

        fetchCarts();
    }, [userId]);

    // useEffect(() => {
    //     console.log('Updated products:', products);
    // }, [products]);

    // useEffect(() => {
    //     console.log('Updated categories:', categories);
    // }, [categories]);
    // useEffect(() => {
    //     console.log('Updated wishlists:', wishlists);
    // }, [wishlists]);

    const addToWishlist = async (itemId) => {
        try {
            const response = await api.post(`/Wishlists/add/${itemId}/${userId}`);
            const addedItem = response.data;
            setWishlists((prevWishlists) => [...prevWishlists, addedItem]);
            console.log(`Item with ID ${itemId} added to wishlist.`);
        } catch (error) {
            console.error('Error adding item to wishlist', error);
        }
    };
    const removeFromWishlist = async (wishlistId) => {
        try {
            const response = await api.delete(`/Wishlists/delete/${wishlistId}`);
            if (response.status === 200) {
                setWishlists((prevWishlists) =>
                    prevWishlists.filter((wishlistItem) => wishlistItem.wishlistId !== wishlistId)
                );
                console.log(`Item with ID ${wishlistId} removed from wishlist.`);
            } else {
                console.error('Failed to remove item from wishlist');
            }
        } catch (error) {
            console.error('Error removing item from wishlist', error);
        }
    };
    const fetchData = async () => {
        try {
            // Fetch products and categories regardless of user authentication
            const [itemsResponse, categoriesResponse] = await Promise.all([
                api.get('/Items'),
                api.get('/Categories'),
            ]);

            setProducts(itemsResponse.data);
            setCategories(categoriesResponse.data);

        } catch (error) {
            console.error('Error fetching data', error);
        }
    };
    const addToCart = async (itemId) => {
        try {
            const response = await api.post(`/Carts/add/${itemId}/${userId}`);
            const addedItem = response.data;
            setCarts((prevCarts) => [...prevCarts, addedItem]);
            console.log(`Item with ID ${itemId} added to cart.`);
        } catch (error) {
            console.error('Error adding item to cart', error);
        }
    };
    const removeFromCart = async (cartId) => {
        try {
            // Make an API request to remove the item from the cart
            const response = await api.delete(`/Carts/delete/${cartId}`);

            if (response.status === 200) {
                // Update the local carts state after successfully removing the item
                setCarts((prevCarts) =>
                    prevCarts.filter((cartItem) => cartItem.cartId !== cartId)
                );
                console.log(`Item with ID ${cartId} removed from cart.`);
            } else {
                console.error('Failed to remove item from cart');
            }
        } catch (error) {
            console.error('Error removing item from cart', error);
        }
    };
    const addProduct = async (productData) => {
        try {
            const response = await api.post('/Items/add', productData, {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'multipart/form-data',
                },
            });
            setProducts((prevProducts) => [...prevProducts, response.data]);
            console.log('Product added successfully');
            await fetchData();
            return true;  // Return true if successful
        } catch (error) {
            console.error('Error adding product', error);
            return false;  // Return false if there is an error
        }
    };
    const updateProduct = async (productId, updatedData) => {
        try {

            console.log("updatedData:", updatedData); // Debugging log to see the content of FormData
            for (let [key, value] of updatedData.entries()) {
                console.log(key, value);
            }


            const response = await api.put(`/Items/update/${productId}`, updatedData, {
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Update product list after successful update
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.itemId === productId ? { ...product, ...response.data } : product
                )
            );

            console.log('Product updated successfully');
            await fetchData();
            return true;  // Return true if successful
        } catch (error) {
            console.error('Error updating product', error);
            return false;  // Return false if there is an error
        }
    };




    const deleteProduct = async (productId) => {
        try {
            const response = await api.delete(`/Products/delete/${productId}`);
            if (response.status === 200) {
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.itemId !== productId)
                );
                console.log('Product deleted successfully');
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const addCategory = async (categoryData) => {
        console.log('add Category: ', categoryData)
        try {
            const response = await api.post('/Categories/add', categoryData);
            setCategories((prevCategories) => [...prevCategories, response.data]);
            console.log('Category added successfully');
            await fetchData();
        } catch (error) {
            console.error('Error adding category', error);
        }
    };

    const updateCategory = async (categoryId, updatedData) => {
        console.log('Edit Category: ', categoryId, updatedData)
        try {
            const response = await api.put(`/Categories/update/${categoryId}`, updatedData);
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.categoryId === categoryId ? { ...category, ...response.data } : category
                )
            );
            console.log('Category updated successfully');
            await fetchData();
        } catch (error) {
            console.error('Error updating category', error);
        }
    };

    const deleteCategory = async (categoryId) => {
        try {
            const response = await api.delete(`/Categories/delete/${categoryId}`);
            if (response.status === 200) {
                setCategories((prevCategories) =>
                    prevCategories.filter((category) => category.categoryId !== categoryId)
                );
                console.log('Category deleted successfully');
            } else {
                console.error('Failed to delete category');
            }
        } catch (error) {
            console.error('Error deleting category', error);
        }
    };



    return (
        <ProductContext.Provider
            value={{
                products,
                categories,
                wishlists,
                addToWishlist,
                removeFromWishlist,
                carts,
                addToCart,
                removeFromCart,
                addProduct, // New functions for product management
                updateProduct,
                deleteProduct,
                addCategory, // New functions for category management
                updateCategory,
                deleteCategory
            }}
        >
            {children}
        </ProductContext.Provider>

    );
};

export { ProductContext, ProductProvider };