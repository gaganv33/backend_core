const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    diagnosis : [{type : mongoose.Types.ObjectId , ref : "diagnosis"}],
    nextAppointment : {type : mongoose.Types.ObjectId , ref : "appointments"}
})

module.exports = mongoose.model("patient_info" , PatientSchema )