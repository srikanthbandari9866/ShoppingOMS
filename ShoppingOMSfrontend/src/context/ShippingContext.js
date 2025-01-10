import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext
import api from '../utils/api'; // Assuming you have an api instance set up

const ShippingContext = createContext();

const ShippingProvider = ({ children }) => {
    const [shippingAddresses, setShippingAddresses] = useState([]);
    const { authData } = useContext(AuthContext); // Accessing auth data
    let userId = authData?.user?.userId || null; // Fetching userId from auth data

    // Fetch addresses whenever the userId changes (e.g., after login or page refresh)
    useEffect(() => {
        if (!userId) return; // Skip fetching if userId is null or undefined

        const fetchShippingAddresses = async () => {
            try {
                const response = await api.get(`/Shippings/getByUserId/${userId}`); // API endpoint for fetching shipping addresses
                setShippingAddresses(response.data); // Update state with the fetched addresses
                console.log(response.data); // Optionally log the response data
            } catch (error) {
                console.error('Failed to fetch shipping addresses', error); // Handle error
            }
        };

        fetchShippingAddresses(); // Call the function to fetch shipping addresses
    }, [userId]); // This will run whenever the userId changes

    // Add new shipping address
    const addShippingAddress = async (newAddress) => {
        try {
            const response = await api.post('/Shippings/add', newAddress, // Send the payload directly as the backend expects
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }); // API endpoint for adding a new address
            setShippingAddresses((prev) => [...prev, response.data]); // Add the new address to the state
        } catch (error) {
            console.error('Failed to add shipping address', error); // Handle error
        }
    };

    // Update an existing shipping address
    const updateShippingAddress = async (addressId, updatedAddress) => {
        try {
            const response = await api.put(
                `/Shippings/update/${addressId}`,
                updatedAddress, // Send the payload directly as the backend expects
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setShippingAddresses((prev) =>
                prev.map((address) =>
                    address.shippingId === addressId ? { ...address, ...response.data } : address
                )
            );
        } catch (error) {
            console.error('Failed to update shipping address', error); // Handle error
        }
    };


    // Remove a shipping address
    const removeShippingAddress = async (addressId) => {
        try {
            await api.delete(`/Shippings/delete/${addressId}`); // API endpoint for deleting an address
            setShippingAddresses((prev) => prev.filter((address) => address.shippingId !== addressId)); // Remove the deleted address from the state
        } catch (error) {
            console.error('Failed to remove shipping address', error); // Handle error
        }
    };

    return (
        <ShippingContext.Provider
            value={{
                shippingAddresses,
                addShippingAddress,
                updateShippingAddress,
                removeShippingAddress,
            }}
        >
            {children}
        </ShippingContext.Provider>
    );
};

export { ShippingContext, ShippingProvider };
