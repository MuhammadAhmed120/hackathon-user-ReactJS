import React, { useEffect, useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import { Close } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '95%',
    width: 450,
    boxShadow: 2,
    // p: 2.5,
    borderRadius: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: "1rem"
};

const CustomModal = ({ open, handleClose, detail, bgcolor }) => {

    const { checkInTime, checkInLocation } = detail || {}

    const [formatDay, setFormatDay] = useState('')
    const [formatDate, setFormatDate] = useState('')
    const [formatTime, setFormatTime] = useState('')

    useEffect(() => {
        const timeExtract = () => {
            if (checkInTime) {
                const separatingTime = checkInTime.split(" ");

                const separateDate = separatingTime[0];
                const separateTime = separatingTime[1];

                // Update state variables using set functions
                setFormatDate(separateDate);
                setFormatTime(separateTime);

                // Assuming you want to set the day as well, you can use a separate function or directly set it
                setFormatDay(new Date(separateDate).toLocaleDateString('en-US', { weekday: 'long' }));
            }
        }
        timeExtract()
    }, [checkInTime])

    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box
                sx={style}
                className={`${bgcolor} border-b-2 border-b-violet-900`}
            >
                <div className='p-3 border-b border-b-violet-500'>
                    <Close fontSize='small' className='self-start cursor-pointer active:opacity-70' onClick={handleClose} />
                </div>

                <div className='px-4 pt-2 pb-4 flex flex-col gap-10'>
                    <div className='flex flex-col flex-wrap gap-2'>
                        <div className='flex flex-wrap gap-2 items-center justify-between'>
                            <h3>Day</h3>
                            <p>{formatDay}</p>
                        </div>
                        <div className='flex flex-wrap gap-2 items-center justify-between'>
                            <h3>Date</h3>
                            <p>{formatDate}</p>
                        </div>
                        <div className='flex flex-wrap gap-2 items-center justify-between'>
                            <h3>Time</h3>
                            <p>{formatTime}</p>
                        </div>
                    </div>
                    <Button className='self-end ml-auto' variant='contained' disableElevation onClick={handleClose}>
                        <span>
                            Close
                        </span>
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default CustomModal;