import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Typography, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorModal = ({ open, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                style: {
                    borderRadius: '10px',
                    padding: '20px',
                    backgroundColor: '#ffebee', // Light red background
                },
            }}
        >
            <Box textAlign="center" p={2}>
                <ErrorIcon
                    style={{ fontSize: '60px', color: '#f44336', marginBottom: '20px' }}
                />
                <DialogTitle>
                    <Typography variant="h5" style={{ fontWeight: '600', color: '#f44336' }}>
                        Something went wrong.
                    </Typography>
                </DialogTitle>
                <Typography variant="body1" style={{ color: '#f44336', marginBottom: '20px' }}>
                    Please try again later.
                </Typography>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="secondary"
                        variant="contained"
                        style={{
                            backgroundColor: '#f44336',
                            color: '#fff',
                            padding: '8px 20px',
                            textTransform: 'none',
                            borderRadius: '25px',
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default ErrorModal;
