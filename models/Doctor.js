const mongoose = require("mongoose")


const DoctorSchema = new mongoose.Schema({
    patients : [{
        type : mongoose.Types.ObjectId,
        ref : "User"
    }],
    appointments : [{type : mongoose.Types.ObjectId , ref : "appointments"}]
})

module.exports =mongoose.model("doctor_info" , DoctorSchema)