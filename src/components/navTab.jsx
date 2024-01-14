import React, { useState, useEffect, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, CssBaseline, Slide, useScrollTrigger, Box, Fab, Fade, Button, Drawer } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import PropTypes from 'prop-types';

import { MdOutlineMenu } from "react-icons/md";

import { ThemeContext } from '../config/themeContext';
import ThemeButtons from './themeBtn';

function ScrollTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            '#back-to-top-anchor',
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'center',
            });
        }
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Fade>
    );
}

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

ScrollTop.propTypes = HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};

export default function NavTab({ activeTab, changeTab }, props) {

    const { theme } = useContext(ThemeContext)
    const [tabBgColor, setTabBgColor] = useState('')

    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate()

    const tabs = [
        { id: 1, title: 'Account', component: '<UserAccount />' },
        { id: 2, title: 'Attendance', component: '<UserAttendance />' },
        { id: 3, title: 'Course', component: '<UserAttendance />' },
    ]

    // LOGOUT FUNCTION
    const handleLogout = async () => {
        await localStorage.removeItem('token')
        await localStorage.removeItem('UID')
        navigate('/login')
    }

    // CHANGING TAB THEME COLOR
    useEffect(() => {
        const tabBgColor = theme ?
            'bg-tabLight text-darkText' : 'bg-tabDark text-lightText'
        setTabBgColor(tabBgColor)
    }, [theme])

    return (
        <>
            <CssBaseline />

            <HideOnScroll {...props}>
                <AppBar sx={{ boxShadow: 'none' }} >
                    <Toolbar className={`w-full h-auto flex items-center justify-between flex-wrap gap-1 sm:gap-7 py-0 overflow-hidden shadow-md ${tabBgColor}`}>
                        {/* TABS ON DESKTOP */}
                        <div className='sm:flex pl-4 hidden overflow-auto flex-1'>
                            {tabs.map(tabInfo =>
                                <h1
                                    key={tabInfo.id}
                                    className={`cursor-pointer text-center flex-1 sm:flex-none p-[14px] active:bg-opacity-70 ${theme ? `hover:bg-slate-100` : `hover:bg-neutral-700`} ${activeTab === tabInfo.id ? 'text-navLight border-b-violet-600 border-b-2' : ''}`}
                                    onClick={() => changeTab(tabInfo.id)}
                                >
                                    {tabInfo.title}
                                </h1>
                            )}
                        </div>

                        {/* DRAWER ON MOBILE */}
                        <div className='sm:hidden pl-4'>
                            <MdOutlineMenu onClick={() => setOpen(true)} color={tabBgColor} size={20} />

                            <Drawer
                                anchor='left'
                                open={open}
                                onClose={() => setOpen(false)}
                            >
                                <div className={`${tabBgColor} h-full flex flex-col justify-between pb-2`}>
                                    <div>
                                        {tabs.map(tabInfo =>
                                            <div className='flex items-center pl-2'>
                                                <MdOutlineMenu />
                                                <h1
                                                    key={tabInfo.id}
                                                    className={`cursor-pointer text-left flex-1 sm:flex-none p-[14px] active:bg-opacity-70 border-b ${theme ? `hover:bg-slate-100 border-b-slate-100` : `hover:bg-neutral-600 border-b-neutral-600`} ${activeTab === tabInfo.id ? 'text-navLight' : ''} ${tabInfo.id === tabs.length ? 'border-b-0' : ''}`}
                                                    onClick={() => { changeTab(tabInfo.id); setOpen(false) }}
                                                >
                                                    {tabInfo.title}
                                                </h1>
                                            </div>
                                        )}
                                    </div>
                                    <div className='sm:hidden block w-100 p-4'>
                                        <Button color='error' variant='contained' style={{ fontWeight: '900', width: "100%" }} onClick={handleLogout} disableElevation>
                                            LOGOUT
                                        </Button>
                                    </div>
                                </div>
                            </Drawer>
                        </div>

                        {/* BUTTONS */}
                        <div className='flex-none ml-auto flex items-center sm:ml-0 gap-4'>
                            <div className='sm:block hidden'>
                                <Button color='error' variant='outlined' style={{ fontWeight: '900' }} onClick={handleLogout} disableElevation>
                                    LOGOUT
                                </Button>
                            </div>
                            <ThemeButtons position='static' />
                            <div className={`h-[64px] w-2 ${theme ? 'bg-violet-400' : 'bg-orange-300'}`} />
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll >

            <Toolbar id="back-to-top-anchor" />

            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    )
}

