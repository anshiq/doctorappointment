const { Medicine } = require("../models/schema");
const getPatientRecipt = async (req, res) => {
    const { name, phoneNumber, email, userId } = req.body;
    const file = req.file.path;
    const data = await Medicine.create({
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        patientId: userId,
        path: file,
        proccess_order: 0
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
const proccessMedicineOrder = async (req, res) => {
    console.log('hit')
    try {
        const { medicId, itemId } = req.body
        const data = await Medicine.findById(itemId);
        console.log(data, medicId, itemId)
        data.proccess_order = 1;
        data.medicId = medicId;
        data.save()
        res.send(data)
    } catch (error) {
        res.status(400).send(error)
    }
}
const submitOrder = async (req, res) => {

}
module.exports = {
    getPatientRecipt,
    getMedicSideRecipt,
    getPatientReciptProfile,
    proccessMedicineOrder,
    submitOrder
};
