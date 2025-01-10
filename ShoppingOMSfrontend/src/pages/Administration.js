// import React, { useState, useNavigate } from 'react';
// import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
// import AdminCategories from '../comonents/AdminCategories';
// import AdminProducts from '../comonents/AdminProducts';

// const Administration = () => {
//     const [activeTab, setActiveTab] = useState('profile');
//     const renderContent = () => {
//         switch (activeTab) {
//             case 'category':
//                 return <AdminCategories />;
//             case 'product':
//                 return <AdminProducts />;

//             default:
//                 return <AdminCategories />;
//         }
//     };

//     return (
//         <Box display="flex" justifyContent='flex-start' sx={{ height: '100vh' }}>
//             {/* Sidebar */}
//             <Box
//                 sx={{
//                     width: 250,
//                     bgcolor: 'background.paper',
//                     borderRight: '1px solid #ddd',
//                     p: 2,
//                 }}
//             >
//                 <Typography variant="h5" gutterBottom>
//                     Account
//                 </Typography>
//                 <Divider />
//                 <List>
//                     <ListItem button onClick={() => setActiveTab('category')}>
//                         <ListItemText primary="Categories" />
//                     </ListItem>
//                     <ListItem button onClick={() => setActiveTab('product')}>
//                         <ListItemText primary="Products" />
//                     </ListItem>

//                 </List>
//             </Box>

//             {/* Content Area */}
//             <Box flex={1} sx={{ p: 3 }}>
//                 {renderContent()}
//             </Box>
//         </Box>

//     );
// };

// export default Administration;


import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, Divider, Typography } from '@mui/material';
import AdminCategories from '../comonents/AdminCategories';
import AdminProducts from '../comonents/AdminProducts';

const Administration = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'category':
                return <AdminCategories />;
            case 'product':
                return <AdminProducts />;
            default:
                return <AdminCategories />;
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh', marginTop: '10px' }}>
            {/* Sidebar */}
            <Box
                sx={{
                    position: 'fixed', // Fixed position
                    top: 0,
                    left: 0,
                    width: 250,
                    bgcolor: 'background.paper',
                    borderRight: '1px solid #ddd',
                    // height: '100vh', // Full height of the screen
                    p: 2,
                    pt: 12,
                    zIndex: 1, // Ensure sidebar stays above other content
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Manage
                </Typography>
                <Divider />
                <List>
                    <ListItem button onClick={() => setActiveTab('category')}>
                        <ListItemText primary="Categories" />
                    </ListItem>
                    <ListItem button onClick={() => setActiveTab('product')}>
                        <ListItemText primary="Products" />
                    </ListItem>
                </List>
            </Box>

            {/* Content Area */}
            <Box
                sx={{
                    marginLeft: '250px', // Offset the content area to the right of the sidebar
                    flex: 1,
                    p: 3,
                    overflowY: 'auto', // Enable scrolling in the content area if needed
                    // height: '100vh', // Ensure content area occupies the full height
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
};

export default Administration;
