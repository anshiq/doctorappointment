import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const PatientMedicineProfile = () => {
    const navigate = useNavigate()
    const [medicineData, setMedicineData] = useState([])
    const fetchData = async () => {
        try {
            const data = localStorage.getItem('user')
            let m;
            if (data) {

                const k = JSON.parse(data)
                m = k.id

            }
            else {
                navigate('/')
            }
            const response = await axios.post('http://localhost:8080/patientMediProfile', { userId: m });
            if (response.status === 200) {
                setMedicineData(response.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Patient Medicine Profile</h1>
            <div>
                {medicineData.length > 0 ? (
                    medicineData.map((medicine, index) => (
                        <div key={index} className="bg-white rounded-md shadow-md p-4 mb-4">
                            <img src={`http://localhost:8080/${medicine.path}`} />
                            <p>Name: {medicine.name}</p>
                            <p>Email: {medicine.email}</p>
                            {/* Display other fields as needed */}
                        </div>
                    ))
                ) : (
                    <p>No medicine data found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default PatientMedicineProfile;
