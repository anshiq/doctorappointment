const { Medicine } = require("../models/schema");
const fs = require('fs')
const path = require('path')
const getPatientRecipt = async (req, res) => {
    const { name, phoneNumber, email } = req.body;
    const file = req.file;
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    console.log("Email:", email);
    console.log("Uploaded file:", file);
    const data = await Medicine.create({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
    });
    if (data) {

    }
};
module.exports = {
    getPatientRecipt,
};
