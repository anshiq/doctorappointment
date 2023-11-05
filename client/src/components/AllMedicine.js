import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const GetAllMedicine = () => {
    const [medicineData, setMedicineData] = useState([]);
    const [buySuccess, setBuySuccess] = useState(false);

    useEffect(() => {
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
            const response = await axios.post("http://localhost:8080/api/buy", { id: id, buyyerID: k });
            if (response.data.buy) {
                setBuySuccess(!buySuccess);
                toast.success('Purchase Successfull Check your mail for more details')
            }
        } catch (error) {
            toast.warn('Purchase Failed')
            console.error("Error buying medicine: ", error);
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">All Medicine</h1>
            <ul>
                {medicineData.map((medicine) => (
                    <li key={medicine._id} className="mb-4 border p-2">
                        <h3>{medicine.name}</h3>
                        <p>Price: {medicine.price}</p>
                        <p>Treat: {medicine.treat}</p>
                        <p>Seller: {medicine.seller}</p>
                        <p>Address: {medicine.address}</p>
                        <button
                            onClick={() =>
                                handleBuyMedicine(medicine._id, "buyer@example.com")
                            }
                            className="bg-blue-500 text-white p-2 rounded"
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
