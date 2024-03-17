import { useContext, useEffect, useState } from "react"
import axios from "axios"

import { ThemeContext } from "../config/themeContext"
import SkeletonInput from "antd/es/skeleton/Input"
import { Image, Skeleton } from "antd"

import { FaCircleUser } from "react-icons/fa6";

export default function UserAccount({ changeTab }) {
    const { VITE_BACKEND_PORT } = import.meta.env

    const [userData, setUserData] = useState(null)

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

    const user = [
        { id: 1, title: "Username", data: userData?.userName || "N/A" },
        { id: 2, title: "Email", data: userData?.userEmail || "N/A" },
        { id: 3, title: "ID", data: userData?.userID || "N/A" },
        { id: 4, title: "Course", data: userData?.userCourse || "N/A" },
        { id: 5, title: "Phone Number", data: userData?.userNumber || "N/A" },
    ]

    return (
        <div className="">
            <div className={`mx-auto max-w-xl px-4 py-6 sm:shadow-lg sm:rounded-lg w-full flex flex-col justify-start gap-7 h-full ${formColor}`}>

                {/* USER ACCOUNT (TITLE) & IMAGE */}
                <div className="flex flex-wrap justify-between gap-3">
                    <h1 className="text-2xl sm:text-3xl w-fit h-fit border-b-4 border-b-violet-800">
                        User Account
                    </h1>

                    {userData ?
                        userData.userProfileImage ?
                            <Image
                                src={userData.userProfileImage}
                                alt={userData.userName}
                                width={80}
                                height={80}
                                className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full self-end"
                            />
                            :
                            <FaCircleUser className="self-end w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                        :
                        <Skeleton.Avatar active shape="circle" className="self-end" size={60} />
                    }
                </div>

                {/* USER DATA */}
                <div className="flex flex-col gap-5 flex-wrap justify-between">
                    {/* OTHER USER DATA RENDER */}
                    {user.map((userInfo) => {
                        return (
                            <div key={userInfo.id}>
                                {userData ?
                                    <>
                                        <div className="flex items-center gap-2">
                                            {/* <p className="font-extrabold text-xs">{userInfo.id}:</p> */}
                                            <p className="font-semibold">{userInfo.title}:</p>
                                        </div>
                                        <div className={`${inputColor} pointer-events-none border-b border-b-violet-600 rounded p-3 pl-2 mt-1`}>{userInfo.data}</div>
                                    </>
                                    :
                                    <SkeletonInput block active size="large" className="mt-1 rounded" />
                                }
                            </div>
                        )
                    })}

                    {/* ATTENDANCE RENDER */}
                    <div>
                        {userData ?
                            <>
                                <div className="flex gap-2 items-center justify-between flex-wrap">
                                    <p>Attendance</p>
                                    <p className="text-violet-700 hover:text-violet-600 active:opacity-70 cursor-pointer uppercase text-sm" onClick={() => changeTab(2)}>View All</p>
                                </div>

                                <div className={`${inputColor} cursor-pointer rounded w-full p-3 pl-2 mt-1 flex flex-col gap-2 hover:shadow-sm hover:shadow-violet-500 transition-shadow`} onClick={() => changeTab(2)}>
                                    {userData.attendance ? userData.attendance.slice(0, 3).map((attend, index) => {
                                        return (
                                            <div key={index} className={`flex justify-between gap-2 flex-wrap items-center font-semibold border-b border-b-violet-500 ${index + 1 === userData.attendance.length ? 'border-b-0' : 'pb-2'}`}>
                                                <p>{attend.checkInTime}</p>
                                                <p className="text-sm">{attend.checkInLocation}</p>
                                            </div>
                                        )
                                    }) : "No records found."}
                                </div>
                            </>
                            :
                            <SkeletonInput block active size="large" className="mt-1 rounded" />
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}