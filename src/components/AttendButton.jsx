import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { ThemeContext } from "../config/themeContext";

import { Button, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { CiCircleInfo } from 'react-icons/ci'

export default function AttendButton({ className, setAttendanceMarked }) {
    const { VITE_BACKEND_PORT } = import.meta.env

    const [status, setStatus] = useState("");
    const [attend, setAttend] = useState("");

    const [loading, setLoading] = useState(true);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchAttendance = async () => {
            setLoading(true)
            const userToken = localStorage.getItem("UID");

            if (userToken) {
                const headers = {
                    Authorization: `Bearer ${userToken}`,
                };

                const data = {
                    userId: userToken,
                    checkInLocation: 'SMIT',
                };

                try {
                    const response = await axios.post(`${VITE_BACKEND_PORT}/user/attendance/checkin`, data, { headers })
                    if (response.data.attend) {
                        setAttend(true);
                        setAttendanceMarked(state => !state)
                    } else {
                        setAttend(false);
                    }
                    setStatus(response.data.message);
                    setLoading(false)
                }
                catch (error) {
                    console.log(error);
                    setStatus("An error occurred. Please try again.");
                    setLoading(false)
                };
            }
        }
        fetchAttendance()
    }, []);


    // SUBMITTING ATTENDANCE
    // const handleSubmit = async () => {
    //     if (attend === null) {
    //         setLoading(false)
    //         return;
    //     }
    //     setLoading(true)

    //     const userToken = localStorage.getItem("UID");
    //     const headers = {
    //         Authorization: `Bearer ${userToken}`,
    //     };

    //     const data = {
    //         userId: userToken,
    //         checkInLocation: 'SMIT',
    //     };

    //     try {
    //         const response = await axios.post(`${VITE_BACKEND_PORT}/user/attendance/checkin`, data, { headers });
    //         setStatus(response.data.message);
    //         if (response.data.attend) {
    //             setAttend(true);
    //         }
    //         setLoading(false)
    //     } catch (error) {
    //         console.log(error);
    //         setStatus("An error occurred. Please try again.");
    //         setLoading(false)
    //         setAttend(null);
    //     }

    // };

    return (
        // ...
        <Box className={className}>
            <LoadingButton
                className={attend && `pointer-events-none opacity-70`}
                loading={loading}
                variant={attend ? "outlined" : "contained"}
                disableElevation
                color="success"
                // onClick={handleSubmit}
            >
                <p className="font-bold">
                    Submit Attendance
                </p>
            </LoadingButton>
            {status &&
                <div className="mt-4 sm:mt-2 ml-1 flex gap-1 justify-start items-center">
                    <CiCircleInfo color="green" />
                    <p className="font-semibold text-sm">{status}</p>
                </div>
            }
        </Box>
    );
}