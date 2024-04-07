import { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import NavTab from '../components/NavTab.jsx';
import UserAccount from '../components/UserAccount.jsx';
import UserAttendance from '../components/UserAttendance.jsx';
import UserCourse from '../components/UserCourse.jsx';

import { ThemeContext } from '../config/themeContext';

const tabs = [
    { id: 1, title: 'Personal', component: UserAccount },
    { id: 2, title: 'Attendance', component: UserAttendance },
    { id: 3, title: 'Course', component: UserCourse },
]

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
            <NavTab tabs={tabs} activeTab={tab} changeTab={setTab} />
            <div className="h-full mt-5 pb-20">
                {tabs.map(tabInfo => tabInfo.id === tab && <tabInfo.component changeTab={setTab} />)}
                {/* {tab === 2 ? <UserAttendance changeTab={setTab} /> : <UserAccount changeTab={setTab} />} */}
            </div>
        </div>
    )
}