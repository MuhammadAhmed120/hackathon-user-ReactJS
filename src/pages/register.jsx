import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { CiLock } from 'react-icons/ci'
import LoadingButton from '@mui/lab/LoadingButton';
import Navbar from '../components/navbar'
import axios from 'axios';

const Register = () => {
    const { VITE_BACKEND_PORT } = import.meta.env

    const [loading, setLoading] = useState(null)
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const [error, setError] = useState("")

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
                userName: values.fullname,
                userEmail: values.email,
                userPassword: values.password,
                userNumber: values.phone
            }
            const registerUser = await axios.post(`${VITE_BACKEND_PORT}/register/user`, userData)
            setLoading(false)

            console.log(registerUser.data.user._id)
            localStorage.setItem('token', registerUser.data.token)
            localStorage.setItem('UID', registerUser.data.user._id)

            const userToken = localStorage.getItem('token')
            userToken && navigate(-1)
        } catch (error) {
            if (error.message === 'Network Error') {
                console.log(error)
                setError(error.message)
                setOpen(true);
                setLoading(false)
            } else {
                console.log('error MESSAGE ===>', error)
                setError(error.response.data.message)
                setOpen(true);
                setLoading(false)
            }
        }
    };

    return (
        <>
            {/* <Navbar /> */}

            <div className='h-screen grid place-items-center w-full sm:bg-[#fafafa]'>
                <Form
                    name="normal_register"
                    className="mt-6 mx-auto max-w-sm px-4 py-6 bg-white rounded-lg w-full shadow-lg"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    scrollToFirstError={true}
                    requiredMark={false}
                    aria-label={false}
                >
                    <Form.Item>
                        <div className='flex justify-center items-center gap-2 flex-wrap'>
                            <h2 className='text-2xl sm:text-3xl'>Register</h2>
                            <CiLock size='24' color='#204dad' />
                        </div>
                    </Form.Item>

                    {/* NAME */}
                    <Form.Item
                        name="fullname"
                        label="Fullname"
                        tooltip="Please enter your real name!"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input size='large' placeholder='Full Name' />
                    </Form.Item>

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
                        <Input.Password size='large' placeholder='Password' minLength={6} />
                    </Form.Item>

                    {/* PHONE */}
                    <Form.Item
                        className='m-0'
                        name="phone"
                        label="Mobile Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Mobile number!',
                            },
                        ]}
                        validateTrigger="onBlur"
                    >
                        <Input
                            maxLength={11}
                            minLength={11}
                            size='large'
                            showCount={false}
                            placeholder='Mobile Number'
                        />
                    </Form.Item>

                    <Form.Item className='m-0'>
                        <p className='text-red-600 text-sm'>{error}</p>
                    </Form.Item>

                    <Form.Item className='m-0'>
                        <LoadingButton type='primary' loading={loading} variant="contained" className='w-full' style={{ marginTop: 20 }}>
                            <span>
                                Register
                            </span>
                        </LoadingButton>
                        {/* Or <NavLink to={'/login'} className="text-blue-600">login now!</NavLink> */}
                    </Form.Item>
                </Form >
            </div>

        </>
    );
};

export default Register;