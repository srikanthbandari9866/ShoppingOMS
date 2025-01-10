import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const AdministrationSideBar = () => {
    return (
        <Drawer variant="permanent" sx={{ width: 240 }}>
            <List>
                <ListItem button>
                    <ListItemText>
                        <Link to="/admin/categories">Categories</Link>
                    </ListItemText>
                </ListItem>
                <ListItem button>
                    <ListItemText>
                        <Link to="/admin/products">Products</Link>
                    </ListItemText>
                </ListItem>
            </List>
            <Divider />
        </Drawer>
    );
};

export default AdministrationSideBar;
