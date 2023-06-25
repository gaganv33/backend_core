const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {json, urlencoded} = express;
const cookieParser = require("cookie-parser")
const app = express();

app.use(cookieParser())
app.use(cors());
app.use(json())
mongoose.connect("mongodb://127.0.0.1:27017/virtualDoc")
.then(()=>{
    console.log("Database connected");
})
.catch(err=>{
    console.log(err);
});

const authRoutes = require("./routes/auth")
app.use("/auth" , authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(3000 , ()=>{
    console.log(`Server started on ${PORT}`);
})