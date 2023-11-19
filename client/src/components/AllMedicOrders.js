import React, { useState, useEffect } from "react";
import axios from "axios";

function AllMedicOrders() {
    const [medicineData, setMedicineData] = useState([]);
    const [userId, setUserId] = useState("");
    const [editData, setEditData] = useState(null);
    const [orderDetails, setOrderDetails] = useState({});

    const fetchData = async () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUserId(parsedUser.id);
            try {
                const response = await axios.post(
                    "http://localhost:8080/getmedicside",
                    {},
                );
                if (response.status === 200) {
                    const filteredData = response.data.filter(
                        (each) => each.proccess_order !== 2,
                    );
                    setMedicineData(filteredData);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    };
    const handleOrderDetails = (e) => {
        setOrderDetails((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const proccessOrder = async (data) => {
        const id = data;
        const response = await axios.post("http://localhost:8080/proccessOrder", {
            medicId: userId,
            itemId: id,
        });
        if (response.status === 200) {
            alert("Successfully processed");
        }
    };
    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:8080/submitOrder", {
            id: editData._id,
            treat: orderDetails.treat,
            seller: orderDetails.seller,
            price: orderDetails.price,
            address: orderDetails.address,
            medicines: orderDetails.medicines,
        });
        if (response.status === 200) {
            console.log(response.data)
        }
    };

    useEffect(() => {
        fetchData();
    }, [editData]);

    return (
        <div className="max-w-screen-xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Patient Medicine Profile</h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {medicineData.length > 0 ? (
                    medicineData.map((medicine, index) => (
                        <div key={index} className="bg-white rounded-md shadow-md p-4">
                            <img
                                src={`http://localhost:8080/${medicine.path}`}
                                alt={medicine.name}
                                className="w-full h-40 object-cover rounded-md mb-2"
                            />
                            <p className="text-lg font-semibold">Name: {medicine.name}</p>
                            <p className="text-gray-600">Email: {medicine.email}</p>
                            {medicine.proccess_order === 1 && medicine.medicId !== userId ? (
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 mt-2 rounded-md cursor-not-allowed"
                                    disabled
                                >
                                    Order Already in Process
                                </button>
                            ) : (
                                <>
                                    {medicine.proccess_order === 1 &&
                                        medicine.medicId === userId ? (
                                        <button
                                            onClick={() => {
                                                setEditData(medicine);
                                            }}
                                            type="button"
                                            className="bg-green-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
                                        >
                                            Checkout Order (Medicine Delivery Pending)
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setEditData(medicine);
                                                proccessOrder(medicine._id);
                                            }}
                                            type="button"
                                            className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Process Order
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No medicine data found for this user.</p>
                )}
            </div>

            {editData && (
                <dialog
                    open
                    className="fixed inset-0 z-10 flex justify-center items-center h-screen overflow-y-scroll w-screen bg-black bg-opacity-40"
                >
                    <form
                        onSubmit={handleOrderSubmit}
                        className="bg-white w-[50%] p-8 rounded-md"
                    >
                        <p className="text-lg font-semibold">Medicine Recipt Image: </p>
                        <img
                            src={`http://localhost:8080/${editData.path}`}
                            alt={editData.name}
                            className="w-full  object-cover rounded-md mb-4"
                        />
                        <p className="text-lg font-semibold">
                            Patient Name: {editData.name}
                        </p>
                        <p className="text-gray-600">Patient Email: {editData.email}</p>
                        <div className="flex flex-col gap-2">
                            <textarea
                                name="medicines"
                                placeholder="Medicines Names and all details eg. Paracitamole (2 times a day),... "
                                onChange={handleOrderDetails}
                                type="text"
                            />
                            <input
                                name="treat"
                                placeholder="Treatment"
                                onChange={handleOrderDetails}
                                type="text"
                            />
                            <input
                                name="seller"
                                placeholder="Your Name"
                                onChange={handleOrderDetails}
                                type="text"
                            />
                            <input
                                name="price"
                                placeholder="Price"
                                type="text"
                                onChange={handleOrderDetails}
                            />
                            <textarea
                                name="address"
                                placeholder="Your Medic Address ... (4444 , streat , california)"
                                type="text"
                                onChange={handleOrderDetails}
                            />
                        </div>
                        <div className="flex flex-row gap-2">
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-green-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditData(null)}
                                className="bg-gray-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
        </div>
    );
}

export default AllMedicOrders;
