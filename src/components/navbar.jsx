import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, CssBaseline, Slide, useScrollTrigger, Box, Fab, Fade, Button } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

    const handleLogout = async () => {
        await localStorage.removeItem('token')
        await localStorage.removeItem('UID')
        navigate('/login')
    }

    return (
        <>
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar sx={{ boxShadow: 'none' }}>
                    <Toolbar className='text-center flex items-center justify-between bg-gradient-to-l from-indigo-500 from-30% to-indigo-600 to-50%'>
                        <Typography variant="h6" component="div">
                            Navbar
                        </Typography>
                        <Button sx={{ color: 'orangered', fontWeight: 900 }} onClick={handleLogout}>
                            LOGOUT
                        </Button>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            <Toolbar id="back-to-top-anchor" />

            <ScrollTop {...props}>
                <Fab size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </>
    );
}