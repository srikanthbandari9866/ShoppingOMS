import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode for decoding JWT
import { useNavigate } from 'react-router-dom'; // For programmatic navigation

const AuthVerifyComponent = () => {
    const [user, setUser] = useState(null);  // State to manage the user data
    const navigate = useNavigate();  // For navigating to the login page programmatically

    useEffect(() => {
        const checkTokenExpiration = () => {
            const token = localStorage.getItem("token");

            if (token) {
                const jwt_Token_decoded = jwtDecode(token);  // Decode the JWT token
                console.log(jwt_Token_decoded.exp * 1000);  // Expiration time of the token
                console.log(Date.now());  // Current timestamp

                // Check if the token is expired
                if (jwt_Token_decoded.exp * 1000 < Date.now()) {
                    // Clear token from localStorage and set user to null
                    localStorage.clear();
                    setUser(null);
                    alert("Token Expired. Please login again!");
                    navigate('/login');
                    setTimeout(() => {
                        window.location.reload(); // Refresh the page
                    }, 100);
                } else {
                    // If token is still valid, update the user state with the decoded info
                    setUser(jwt_Token_decoded);
                }
            }
        };

        // Initial check when component is mounted
        checkTokenExpiration();

        // Optionally, you can add a listener for route changes if needed:
        // const unsubscribe = history.listen(() => {
        //   checkTokenExpiration();
        // });

        // Clean up listener if necessary (e.g., if using history.listen)
        // return () => unsubscribe();

    }, [navigate]);  // Re-run the effect when the navigate function changes

    return <div></div>;
};

export default AuthVerifyComponent;
