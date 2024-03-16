import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, CssBaseline, Slide, useScrollTrigger, Box, Fab, Fade, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import ThemeButtons from './ThemeBtn.jsx';
import { ThemeContext } from "../config/themeContext.jsx"

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

export default function Navbar(props) {
    const navigate = useNavigate()
    const { theme } = useContext(ThemeContext);
    const [navBgColor, setNavBgColor] = useState('')

    const handleLogout = async () => {
        localStorage.removeItem('token')
        localStorage.removeItem('UID')
        navigate('/login')
    }

    // CHANGING THEME COLOR
    useEffect(() => {
        const navBgColor = theme ? 'bg-navLight' : 'bg-navDark'
        setNavBgColor(navBgColor)
    }, [theme])

    return (
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
            <AppBar sx={{ boxShadow: 'none' }}>
                <Toolbar className={`text-center flex items-center justify-between flex-wrap ${navBgColor}`}>
                    <h1 className='text-xl sm:text-2xl'>
                        User
                    </h1>
                    <div className='flex justify-between items-center gap-2'>
                        <Button sx={{ color: theme ? 'white' : 'red', fontWeight: '900' }} onClick={handleLogout} disableElevation>
                            LOGOUT
                        </Button>
                        <ThemeButtons position='static' />
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
    );
}