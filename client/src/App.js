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
import MedicSell from "./components/MedicSell";
import GetAllMedicine from "./components/AllMedicine";
import DoctorProfile from "./components/DoctorProfile";
import DoctorUpdateAppointments from "./components/DoctorUpdateAppointments";

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
                    {/* <Route path="/medicsell" element={<MedicSell />} /> */}
                    <Route path="/buy" element={<GetAllMedicine />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {user && user.role === "doctor" ? (
                        <>
                            <Route path="/*" element={<DoctorPage />} />
                            <Route path="/profile" element={<DoctorProfile />} />
                            <Route path="/yourappointments" element={<DoctorUpdateAppointments />} />
                        </>
                    ) : (
                        <>

                            {user && user.role === "medic" ? (
                                <>
                                    <Route path="/*" element={<GetAllMedicine />} />
                                    <Route path="/medicsell" element={<MedicSell />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/home" element={<UserHome />} />
                                    <Route path="/newappointment" element={<NewAppointment />} />
                                    <Route path="/verify-email" element={<EmailVerification />} />
                                </>
                            )}
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
