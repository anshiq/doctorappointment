const { Medicine } = require("../models/schema");
const getPatientRecipt = async (req, res) => {
    const { name, phoneNumber, email, userId } = req.body;
    const file = req.file.path;
    const data = await Medicine.create({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        patientId: userId,
        path: file
    });
    if (data) {
        res.status(200).send(data)
    }
    else {
        res.status(404).send(data);
    }
};
const getMedicSideRecipt = async (req, res) => {

    const data = await Medicine.find({});
    if (data) {
        res.status(200).send(data)
    }
    else {
        res.status(404).send(data);
    }
}
const getPatientReciptProfile = async (req, res) => {
    const { userId } = req.body
    const data = await Medicine.find({ patientId: userId });
    if (data) {
        res.status(200).send(data)
    }
    else {
        res.status(404).send(data);
    }
}
module.exports = {
    getPatientRecipt,
    getMedicSideRecipt,
    getPatientReciptProfile
};
