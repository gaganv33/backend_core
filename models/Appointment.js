const mongoose = require("mongoose")


const AppointmentSchema = new mongoose.Schema({
    date : Date,
    doctor : {type : mongoose.Schema.Types , ref : "doctor_info"},
    patient : {type : mongoose.Schema.Types , ref : "patient_info"},
    diagnosis : {type : mongoose.Schema.Types , ref : "diagnosis"}
})

module.exports = mongoose.model("appointments" , AppointmentSchema)