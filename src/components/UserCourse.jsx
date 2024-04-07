import { useContext, useEffect, useState } from "react"
import axios from "axios"

import { ThemeContext } from "../config/themeContext.jsx"

import SkeletonInput from "antd/es/skeleton/Input"

import CustomModal from "./Modal.jsx"
import AttendButton from './AttendButton.jsx'
import { CiSquareChevRight } from "react-icons/ci"



export default function UserCourse({ changeTab }) {
    const { VITE_BACKEND_PORT } = import.meta.env

    const [userData, setUserData] = useState(null)

    const { userCourse } = userData || {}

    const [selectIndex, setSelectIndex] = useState(null)
    const [attendanceMarked, setAttendanceMarked] = useState(false);

    // MODAL
    const [open, setOpen] = useState(false);

    const handleOpen = (index) => {
        setSelectIndex(userData?.attendance[index]);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    // THEMES
    const { theme } = useContext(ThemeContext)

    const [bgColor, setBgColor] = useState('')
    const [cardColor, setCardColor] = useState('')

    // CHANGING THEME COLOR
    useEffect(() => {
        const bgColor = theme ? 'bg-tabLight' : 'bg-tabDark'
        const cardColor = theme ? 'bg-[#f5f5f5]' : 'bg-navDark'
        setBgColor(bgColor)
        setCardColor(cardColor)
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

                    if (fetchData.data) {
                        fetchData.data.userData.attendance.reverse();
                        setUserData(fetchData.data.userData)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchUserData()
    }, [attendanceMarked]);

    return (
        <div className="">
            <CustomModal open={open} handleClose={handleClose} bgcolor={bgColor} detail={selectIndex} />


            <div className={`mx-auto px-4 py-6 w-full flex flex-col justify-start gap-10 ${bgColor}`}>

                {/* TITLE */}
                <div className="w-full flex justify-between gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl w-fit h-fit border-b-4 border-b-violet-800">
                        User Course
                    </h1>
                </div>

                <div>
                    <h1 className="text-xl sm:text-2xl text-center font-extrabold">You are currentry enrolled in <span className="text-violet-700 hover:text-violet-400 text-[26px] sm:text-[30px]">
                        {userCourse || 'N/A'}
                    </span>
                    </h1>
                </div>

                <div className="flex flex-wrap items-center justify-start gap-3">
                    <card className={`${cardColor} w-full sm:w-[40%] flex-grow mx-auto border border-[gainsboro] h-44 flex flex-col justify-between items-start p-6 rounded-xl overflow-hidden`}>
                        <div>
                            <p className="text-xs">COURSE</p>
                            <h3 className={`mt-2 text-lg sm:text-2xl ${userCourse === 'WMA' && 'text-violet-400'}`}>
                                {userCourse ? 'Web and App Development' : 'N/A'}
                            </h3>
                        </div>
                        <div
                            className="flex text-sm items-center gap-1 hover:gap-2 w-fit transition-all hover:text-white active:opacity-70 cursor-pointer"
                            onClick={() => changeTab(1)}
                        >
                            <p>
                                View Account
                            </p>
                            <CiSquareChevRight size={17} />
                        </div>
                    </card>
                    <card className={`${cardColor} w-full sm:w-[40%] flex-grow mx-auto border border-[#8e8e8e] h-44 flex flex-col justify-between items-start p-6 rounded-xl overflow-hidden`}>
                        <div>
                            <p className="text-xs">COURSE</p>
                            <h3 className={`mt-2 text-lg sm:text-2xl ${userCourse === 'Graphic Designing' && 'text-violet-400'}`}>
                                {userCourse ? 'Graphic Designing' : 'N/A'}
                            </h3>
                        </div>
                        <div
                            className="flex text-sm items-center gap-1 hover:gap-2 w-fit transition-all hover:text-white active:opacity-70 cursor-pointer"
                            onClick={() => changeTab(1)}
                        >
                            <p>
                                View Account
                            </p>
                            <CiSquareChevRight size={17} />
                        </div>
                    </card>
                    <card className={`${cardColor} w-full sm:w-[40%] flex-grow mx-auto border border-[#8e8e8e] h-44 flex flex-col justify-between items-start p-6 rounded-xl overflow-hidden`}>
                        <div>
                            <p className="text-xs">COURSE</p>
                            <h3 className={`mt-2 text-lg sm:text-2xl ${userCourse === '3D Animation' && 'text-violet-400'}`}>
                                {userCourse ? '3D Animation' : 'N/A'}
                            </h3>
                        </div>
                        <div
                            className="flex text-sm items-center gap-1 hover:gap-2 w-fit transition-all hover:text-white active:opacity-70 cursor-pointer"
                            onClick={() => changeTab(1)}
                        >
                            <p>
                                View Account
                            </p>
                            <CiSquareChevRight size={17} />
                        </div>
                    </card>
                    <card className={`${cardColor} w-full sm:w-[40%] flex-grow mx-auto border border-[gainsboro] h-44 flex flex-col justify-between items-start p-6 rounded-xl overflow-hidden`}>
                        <div>
                            <p className="text-xs">COURSE</p>
                            <h3 className={`mt-2 text-lg sm:text-2xl ${userCourse === 'Chatbot' && 'text-violet-400'}`}>
                                {userCourse ? 'Chatbot' : 'N/A'}
                            </h3>
                        </div>
                        <div
                            className="flex text-sm items-center gap-1 hover:gap-2 w-fit transition-all hover:text-white active:opacity-70 cursor-pointer"
                            onClick={() => changeTab(1)}
                        >
                            <p>
                                View Account
                            </p>
                            <CiSquareChevRight size={17} />
                        </div>
                    </card>
                </div>
            </div>
        </div >
    )
}