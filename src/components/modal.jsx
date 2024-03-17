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

    const { checkInTime, checkInLocation, attend } = detail || {}

    const [formatDay, setFormatDay] = useState('')
    const [formatDate, setFormatDate] = useState('')
    const [formatTime, setFormatTime] = useState('')

    // TIME FORMATTING
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
                className={`${bgcolor} border-b-2 ${attend ? "border-b-violet-900" : "border-b-red-900"}`}
            >
                <div className={`p-3 border-b ${attend ? "border-b-violet-500" : "border-b-red-500"}`}>
                    <Close fontSize='small' className='self-start cursor-pointer active:opacity-70' onClick={handleClose} />
                </div>

                <div className='px-4 pt-2 pb-4 flex flex-col gap-10'>
                    {detail !== null ?
                        <div className='flex flex-col flex-wrap gap-2'>
                            <div className='flex flex-wrap gap-2 items-center justify-end'>
                                {/* <h3>Attend</h3> */}
                                <p className='font-bold'>{attend ? 'Attended' : 'Not Attended'}</p>
                            </div>
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
                        :
                        // LOADER
                        <div className='mx-auto my-5'>
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
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