import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessModal = ({ open, onClose }) => {
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
                    backgroundColor: '#e8f5e9', // Light green background
                },
            }}
        >
            <Box textAlign="center" p={2}>
                <CheckCircleIcon
                    style={{ fontSize: '60px', color: '#4caf50', marginBottom: '20px' }}
                />
                <DialogTitle>
                    <Typography variant="h5" style={{ fontWeight: '600', color: '#388e3c' }}>
                        Success!
                    </Typography>
                </DialogTitle>
                <Typography variant="body1" style={{ color: '#388e3c', marginBottom: '20px' }}>
                    Your operation was completed successfully.
                </Typography>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color="primary"
                        variant="contained"
                        style={{
                            backgroundColor: '#388e3c',
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

export default SuccessModal;
