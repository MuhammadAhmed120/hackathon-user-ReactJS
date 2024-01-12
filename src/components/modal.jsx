import React from 'react';
import { Modal, Button, Box } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 2,
    p: 2.5,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: "1rem"
};

const CustomModal = ({ open, handleClose, error }) => (
    <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >
        <Box
            sx={style}
        >
            <p id="keep-mounted-modal-title" className="text-lg">
                {error}
            </p>
            <Button className='w-full' variant='contained' disableElevation onClick={handleClose}>
                Close
            </Button>
        </Box>
    </Modal>
);

export default CustomModal;