import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import Navbar from "../components/navbar"
import { ThemeContext } from '../config/themeContext';

export default function Home() {
    const { VITE_BACKEND_PORT } = import.meta.env
 
    const navigate = useNavigate()
    const { theme, toggleTheme } = useContext(ThemeContext)

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
        <>
            <Navbar />
            <h1>HOME</h1>
        </>
    )
}