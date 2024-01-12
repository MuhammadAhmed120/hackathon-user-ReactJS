import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

// PAGES
import Home from "../pages/home"
import UserAccount from "../pages/userAccount";
import Register from "../pages/register";
import Login from "../pages/login";
import ResetPass from "../pages/resetPass";

export default function Routing() {
    const token = localStorage.getItem('token') || false
    const [authorize, setAuthorize] = useState(false)

    const { VITE_BACKEND_PORT } = import.meta.env;

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                try {
                    const response = await axios.post(`${VITE_BACKEND_PORT}/tokenverify`, null, {
                        headers
                    });
                    if (response.status === 200 && response.data.message === "AUTHORIZED") {
                        localStorage.setItem('UID', response.data.decodedToken.customer_id)
                        return setAuthorize(true);
                    } else {
                        console.error('Token not authorized:', response.data);
                        return setAuthorize(false);
                    }
                } catch (error) {
                    console.log(error)
                    if (error.code !== "ERR_NETWORK") {
                        console.error('Error:', error.response.data.message);
                        if (error.response.data.message === 'unauthorized token') {
                            localStorage.removeItem('token')
                            localStorage.removeItem('UID')
                            return setAuthorize(false);
                        }
                    } else {
                        console.log('NETWORK ERROR')
                    }
                }
            }
        };

        fetchData();
    }, [token]);

    return (
        <BrowserRouter>
            <Routes>
                {/* {token && authorize ? (
                    <>
                        <Route path="/login" element={<Navigate to="/" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                    </>
                )}
                 */}

                <Route path="/" element={<Home />} />
                {/* <Route path="/home" element={authorize ? <Home /> : <Navigate to="/login" replace />} /> */}

                <Route path="/login" element={<Login />} />
                {/* <Route path="/login" element={authorize ? <Navigate to="/home" replace /> : <Login />} /> */}

                {/* <Route path="/user" element={<UserAccount />} />
                <Route path="/reset-password/:token" element={<ResetPass />} /> */}
            </Routes>
        </BrowserRouter>
    )
}