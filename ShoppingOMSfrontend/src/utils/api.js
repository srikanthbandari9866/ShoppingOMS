import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7051/api/', // Replace with your API base URL
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error('Unauthorized! Redirecting to login.');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // window.location.href = '/login'; // Redirect to login page
        } else if (error.response?.status === 500) {
            console.error('Server error:', error.response.data.message || 'Internal server error');
        }
        return Promise.reject(error);
    }
);


api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default api;

// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'https://localhost:7051/api/', // Replace with your API base URL
// });

// api.interceptors.response.use(
//     (response) => response,
//     async (error) => {

//         // Check if the error response status is 401 (Unauthorized)
//         if (error.response?.status === 401) {
//             // Handle unauthorized access
//             console.error('Unauthorized! Token may be expired or invalid.');

//             // Show a login modal (implement modal logic as needed)
//             // For now, we clear the local storage and show the login page
//             localStorage.removeItem('token');
//             localStorage.removeItem('user');
//             // setTimeout(() => {
//             //     alert("Token Expired. Please login again!"); // Show alert
//             //     console.log("Token Expired. Please login again!");
//             //     window.location.href = '/login'; // Redirect to login page
//             // }, 100);
//         } else if (error.response?.status === 500) {
//             console.error('Server error:', error.response.data.message || 'Internal server error');
//         }

//         return Promise.reject(error);
//     }
// );

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => Promise.reject(error));

// export default api;
