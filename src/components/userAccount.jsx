import { useContext, useEffect, useState } from "react"
import axios from "axios"

import { ThemeContext } from "../config/themeContext"

export default function UserAccount() {
    const { VITE_BACKEND_PORT } = import.meta.env

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

                    console.log(fetchData)
                } catch (error) {
                    console.log(error)
                }
            }
        }
        fetchUserData()
    }, []);

    return (
        <div className="">
            <div className={`mx-auto max-w-xl px-4 py-6 sm:shadow-lg sm:rounded-lg w-full flex flex-col justify-start gap-7 h-full ${formColor}`}>
                <div className="flex flex-wrap justify-between gap-3">
                    <h1 className="text-lg sm:text-2xl w-fit h-fit border-b-4 border-b-violet-800">
                        User Account
                    </h1>
                    <img src="https://res.cloudinary.com/dwbkyxdrt/image/upload/v1702806629/User_Picture/UserImage.png" alt="" className="w-14 h-14 rounded-full" />
                </div>

                <div className="flex flex-col gap-5 flex-wrap justify-between">
                    <div>
                        <p>Username:</p>
                        <div className={`${inputColor} pointer-events-none rounded p-3 pl-2 mt-1`}>Muhammad Ahmed</div>
                    </div>
                    <div>
                        <p>Email:</p>
                        <div className={`${inputColor} pointer-events-none rounded p-3 pl-2 mt-1`}>ahmed@gmail.com</div>
                    </div>
                    <div>
                        <p>Roll Number:</p>
                        <div className={`${inputColor} pointer-events-none rounded p-3 pl-2 mt-1`}>WMA-94636</div>
                    </div>
                    <div>
                        <p>Course:</p>
                        <div className={`${inputColor} pointer-events-none rounded p-3 pl-2 mt-1`}>Web and Mobile App Development</div>
                    </div>
                    <div>
                        <p>Phone Number:</p>
                        <div className={`${inputColor} pointer-events-none rounded p-3 pl-2 mt-1`}>03458377492</div>
                    </div>
                </div>
            </div>
        </div>
    )
}