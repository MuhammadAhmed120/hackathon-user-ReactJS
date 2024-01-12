import axios from 'axios';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { CiLock } from 'react-icons/ci'
import { MdDarkMode, MdLightMode } from "react-icons/md";

import { Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import LoginIcon from '@mui/icons-material/Login';
import LoadingButton from '@mui/lab/LoadingButton';

import { ThemeContext } from '../config/themeContext.jsx';


const Login = () => {
    const { VITE_BACKEND_PORT } = import.meta.env

    const navigate = useNavigate()
    const formRef = useRef(null);
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState("")
    const { theme, toggleTheme } = useContext(ThemeContext);

    // IF USER IS LOGGED IN NAVIGATE TO HOME
    useEffect(() => {
        const navigatePage = () => {
            const token = localStorage.getItem('token')
            const UID = localStorage.getItem('UID')
            if (token && UID) {
                navigate('/')
            }
        }
        navigatePage()
    }, [])

    // ON REGISTERING
    const onFinish = async (values) => {
        setLoading(true)
        try {
            const userData = {
                userEmail: values.email,
                userPassword: values.password,
            }

            const loginUser = await axios.post(`${VITE_BACKEND_PORT}/login/user`, userData)

            localStorage.setItem('token', loginUser.data.token)
            localStorage.setItem('UID', loginUser.data.user._id)


            const userToken = localStorage.getItem('token')
            const userID = localStorage.getItem('UID')
            setLoading(false)


            if (userToken !== null && userID !== null) {
                console.log(userToken)
                console.log(userID)
                navigate('/')
            }
        } catch (error) {
            if (error.message === 'Network Error') {
                console.log(error)
                setError(error.message)
                setLoading(false)
            } else {
                console.log('error MESSAGE ===>', error)
                setError(error.response.data.message)
                setLoading(false)
            }
        }
    };

    // INPUT VALIDATION
    const onFinishFailed = (errorInfo) => {
        // Get all the field names with errors
        const errorFields = errorInfo.errorFields.map(field => field.name[0]);

        // Get all the field instances in the order they appear in the form
        const formFields = Object.keys(formRef.current.getFieldsValue());

        // Find the first field with an error and focus on it
        const firstErrorField = formFields.find(field => errorFields.includes(field));
        if (firstErrorField) {
            const fieldInstance = formRef.current.getFieldInstance(firstErrorField);
            if (fieldInstance) {
                fieldInstance.focus();
            }
        }
    };

    // sm:bg-gradient-to-br bg-gradient-to-b from-white from-10% sm:to-indigo-200 to-indigo-50 to-90% 

    return (
        <>
            <div className='h-screen flex items-center justify-center w-full relative'>

                <CiLock className='mb-3 absolute top-4 left-5 text-[23px] md:text-[26px] z-50' />

                {/* THEME ICONS */}
                {theme ?
                    <MdDarkMode className={`mb-3 absolute top-4 right-5 text-blue-800 text-[23px] md:text-[26px] z-50 cursor-pointer ${!theme ? 'hidden' : 'themeIconAni block'}`} onClick={toggleTheme} />
                    :
                    <MdLightMode className={`mb-3 absolute top-4 right-5 text-orange-400 text-[23px] md:text-[26px] z-50 cursor-pointer ${theme ? 'hidden' : 'themeIconAni block'}`} onClick={toggleTheme} />
                }

                <Form
                    ref={formRef}
                    name="normal_login"
                    className="mx-auto max-w-sm px-4 py-6 sm:bg-white  sm:shadow-lg rounded-lg w-full flex flex-col sm:justify-center sm:gap-14 sm:h-auto h-full justify-evenly"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    scrollToFirstError={true}
                    requiredMark={false}
                    layout='vertical'
                >
                    {/* USER PORTAL TITLE */}
                    <Form.Item className={`m-0 sm:bg-transparent sm:text-black ${theme ? 'text-blue-700' : 'text-orange-200'} sm:p-0 p-3 w-full absolute top-0 left-0 sm:relative`}>
                        <h1 className='text-2xl sm:text-3xl font-semibold sm:text-slate-800 w-fit mx-auto'>User Portal</h1>
                    </Form.Item>

                    {/* INPUTS */}
                    <div>
                        {/* EMAIL */}
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid Email!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input size='large' placeholder='Email' />
                        </Form.Item>

                        {/* PASSWORD */}
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                size='large'
                                placeholder='Password'
                            />
                        </Form.Item>

                        {error.length > 0 && <Form.Item className='-mb-4 -mt-4'>
                            <span className='text-red-500 text-[13px] sm:text-[15px]'>{error}</span>
                        </Form.Item>}
                    </div>

                    {/* LOGIN BUTTON */}
                    <Form.Item className='mb-2'>
                        <LoadingButton type='primary' variant={theme ? 'outlined' : 'contained'} loading={loading} className='w-full' color='success' endIcon={<LoginIcon size="large" />}>
                            <span className='font-semibold'>
                                Login
                            </span>
                        </LoadingButton>
                    </Form.Item>
                </Form >
            </div >

        </>
    );
};

export default Login;





// const forgotPassword = () => {
//     setError("")
//     setOpen(true)
// }

// const [forgotLoad, setForgotLoad] = useState(null)

// const handleResetPass = async (values) => {
//     setForgotLoad(true)
//     try {
//         const userData = {
//             userEmail: values.userEmail,
//         }

//         const resetPasswordLink = await axios.post(`${VITE_BACKEND_PORT}/password/forgot`, userData)
//         console.log(resetPasswordLink)
//         setError('Reset email sent successfully.')
//         setOpen(true);
//         setForgotLoad(false)
//         setTimeout(() => {
//             setOpen(false);
//         }, 10000);
//     } catch (error) {
//         if (error.message === 'Network Error') {
//             console.log(error)
//             setError(error.message)
//             setOpen(true);
//             setForgotLoad(false)
//         } else {
//             console.log('error MESSAGE ===>', error)
//             setError(error.response.data.message)
//             setOpen(true);
//             setForgotLoad(false)
//         }
//     }
// }


{/* RESET */ }
{/* <Form.Item className='m-2 mt-0'>
                        <NavLink className="text-blue-500 m-0 float-right" onClick={forgotPassword}>
                            Forgot password
                        </NavLink>
                    </Form.Item> */}