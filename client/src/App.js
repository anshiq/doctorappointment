import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import UserHome from "./components/User";
import NewAppointment from "./components/NewAppointment";
import EmailVerification from "./components/EmailVerification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DoctorPage from "./components/Doctor";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
        }
    }, []);
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {user && user.role === "doctor" ? (
                        <Route path="/*" element={<DoctorPage />} />
                    ) : (
                        <>
                            <Route path="/home" element={<UserHome />} />
                            <Route path="/newappointment" element={<NewAppointment />} />
                            <Route path="/verify-email" element={<EmailVerification />} />
                        </>
                    )}
                    {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
            </div>
            <ToastContainer />
        </Router>
    );
}

export default App;
