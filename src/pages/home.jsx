import { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Navbar from "../components/navbar"
import UserAccount from '../components/userAccount.jsx';
import UserAttendance from '../components/userAttendance.jsx';
import NavTab from '../components/navTab.jsx';

import { ThemeContext } from '../config/themeContext';

export default function Home() {
    const { VITE_BACKEND_PORT } = import.meta.env

    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext)

    const [tab, setTab] = useState(1)

    // IF USER IS LOGGED IN NAVIGATE TO HOME
    useEffect(() => {
        const navigatePage = () => {
            const token = localStorage.getItem('token')
            const UID = localStorage.getItem('UID')
            if (!token && !UID) {
                navigate('/login')
            }
        }
        navigatePage()
    }, [])

    return (
        <div>
            {/* <Navbar /> */}
            <NavTab activeTab={tab} changeTab={setTab} />
            <div className="py-12 h-full">
                {tab === 2 ? <UserAttendance /> : <UserAccount />}
            </div>
        </div>
    )
}