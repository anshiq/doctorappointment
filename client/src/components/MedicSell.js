import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const SellMedicine = () => {
    const [medicine, setMedicine] = useState({
        name: '',
        price: '',
        treat: '',
        seller: '',
        address: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMedicine({
            ...medicine,
            [name]: value,
        });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/sell', medicine);
            if (response.data.update) {
                toast.success('Medicine uploaded successfully!');
                navigate('/buy')

            } else {
                setErrorMessage('Medicine upload failed');
            }
        } catch (error) {
            setErrorMessage('An error occurred while uploading medicine');
        }
    };

    return (
        <div className="w-96 mx-auto mt-8 p-4 border rounded-lg bg-white">
            <h1 className="text-2xl font-semibold mb-4">Sell Medicine</h1>
            {errorMessage && <div className="text-red-500 mb-2">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mb-2">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block font-semibold">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={medicine.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block font-semibold">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={medicine.price}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="treat" className="block font-semibold">
                        Treat:
                    </label>
                    <input
                        type="text"
                        id="treat"
                        name="treat"
                        value={medicine.treat}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="seller" className="block font-semibold">
                        Seller:
                    </label>
                    <input
                        type="email"
                        id="seller"
                        name="seller"
                        value={medicine.seller}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block font-semibold">
                        Address:
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={medicine.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-full"
                >
                    Upload Medicine
                </button>
            </form>
        </div>
    );
};

export default SellMedicine;
