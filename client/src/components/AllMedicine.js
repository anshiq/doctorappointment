import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GetAllMedicine = () => {
    const [medicineData, setMedicineData] = useState([]);
    const [buySuccess, setBuySuccess] = useState(false);
    const [role, setRole] = useState("");
    const navi = useNavigate()

    useEffect(() => {
        let k = localStorage.getItem("user");
        k = JSON.parse(k);
        setRole(k.role);

        // Fetch all medicine data
        axios.get("http://localhost:8080/api/allmedicine").then((response) => {
            setMedicineData(response.data);
        });
    }, [buySuccess]);

    const handleBuyMedicine = async (id) => {
        let k = localStorage.getItem("user");
        k = JSON.parse(k);
        k = k.id;

        try {
            // Make a POST request to buy medicine
            const response = await axios.post("http://localhost:8080/api/buy", {
                id: id,
                buyyerID: k,
            });
            if (response.data.buy) {
                setBuySuccess(!buySuccess);
                toast.success("Purchase Successfull Check your mail for more details");
            }
        } catch (error) {
            toast.warn("Purchase Failed");
            console.error("Error buying medicine: ", error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            {role === "medic" && (
                <button

                    onClick={() => {
                        navi('/medicsell')
                    }}
                    className="w-[14rem] mx-auto p-3 bg-green-500 text-white rounded shadow-md hover:bg-green-600 transition-colors duration-300">
                    Sell New Medicine
                </button>
            )}
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-800">All Medicines</h1>
            <ul>
                {medicineData.map((medicine) => (
                    <li key={medicine._id} className="mb-6 p-4 border rounded-md shadow-md">
                        <h3 className="text-2xl font-semibold text-blue-700">{medicine.name}</h3>
                        <p className="text-gray-600">Price: ${medicine.price}</p>
                        <p className="text-gray-600">Treats: {medicine.treat}</p>
                        <p className="text-gray-600">Seller: {medicine.seller}</p>
                        <p className="text-gray-600">Address: {medicine.address}</p>
                        <button
                            onClick={() => handleBuyMedicine(medicine._id, "buyer@example.com")}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-4"
                        >
                            Buy
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetAllMedicine;
