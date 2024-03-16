import { useContext, useEffect, useState } from "react"
import axios from "axios"

import { ThemeContext } from "../config/themeContext"

import SkeletonInput from "antd/es/skeleton/Input"

import CustomModal from "./Modal.jsx"
import AttendButton from './AttendButton.jsx'

export default function UserAttendance({ changeTab }) {
    const { VITE_BACKEND_PORT } = import.meta.env

    const [userData, setUserData] = useState(null)

    const [selectIndex, setSelectIndex] = useState(null)

    // MODAL
    const [open, setOpen] = useState(false);

    const handleOpen = (index) => {
        setSelectIndex(userData?.attendance[index]);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    // THEMES
    const { theme } = useContext(ThemeContext)

    const [formColor, setFormColor] = useState('')
    const [inputColor, setInputColor] = useState('')

    // CHANGING THEME COLOR
    useEffect(() => {
        const formColor = theme ? 'bg-tabLight' : 'bg-tabDark'
        const inputColor = theme ? 'bg-[#f5f5f5]' : 'bg-navDark'
        setFormColor(formColor)
        setInputColor(inputColor)
    }, [theme])


    // GETTING USER DATA
    useEffect(() => {
        const fetchUserData = async () => {
            const userToken = localStorage.getItem('token')
            if (userToken) {

                try {
                    const headers = {
                        'Authorization': `Bearer ${userToken}`
                    };

                    const fetchData = await axios.get(`${VITE_BACKEND_PORT}/user/my-account`, { headers })

                    setUserData(fetchData.data.userData)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchUserData()
    }, []);

    return (
        <div className="">
            <CustomModal open={open} handleClose={handleClose} bgcolor={formColor} detail={selectIndex} />


            <div className={`mx-auto px-4 py-6 w-full flex flex-col justify-start gap-7 h-[80vh] overflow-y-auto ${formColor}`}>

                {/* TITLE */}
                <h1 className="text-lg sm:text-2xl w-fit h-fit border-b-4 border-b-violet-800">
                    User Attendance
                </h1>

                {/* USER DATA */}
                <div className="flex flex-col gap-2 flex-wrap justify-between">
                    {/* ATTENDANCE & VIEW ACCOUNT TEXT */}
                    <div className="flex gap-5 items-center justify-between flex-wrap mb-4">
                        <AttendButton className="" />

                        <p className="font-semibold text-lg sm:text-2xl hidden">Attendance</p>
                        <p className="text-violet-700 hover:text-violet-600 ml-auto active:opacity-70 cursor-pointer uppercase font-semibold text-sm" onClick={() => changeTab(1)}>View Account</p>
                    </div>

                    {/* ATTENDANCE RENDER */}
                    <div>
                        {userData ?
                            userData.attendance ? userData.attendance.map((attend, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`${inputColor} cursor-pointer w-full p-3 pl-2 mt-0 flex flex-col gap-2 mb-5 border-b ${index % userData.attendance.length ? 'border-b-violet-300' : 'border-b-violet-500'}`}

                                        onClick={() => handleOpen(index)}
                                    >
                                        <div className={`flex justify-between gap-2 flex-wrap items-center font-semibold`}>
                                            <p>{attend.checkInTime}</p>
                                            <p className="text-sm">{attend.checkInLocation}</p>
                                        </div>
                                    </div>
                                )
                            }) : "No records found."
                            :
                            <SkeletonInput block active size="large" />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}