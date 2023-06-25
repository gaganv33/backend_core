const Logins = require("../models/Logins");
const User = require("../models/User");

module.exports.authenticateRequest = async(req , res , next)=>{
    try{
        if(!req.cookies.auth_tkn) return res.status(401).json({err : "You need to login to access this resource"});
        const LoginData = await Logins.findOne({token : req.cookies.auth_tkn});
        if(!LoginData || (LoginData.createdAt < new Date(Date.now() - 60 * 24 * 60 * 1000))){
            if(LoginData) await Logins.findByIdAndDelete(LoginData._id);
            return res.status(401).json({err : "Your session has expired please login"})
        };
        const user = await User.findById(LoginData.userId);
        req.user = user;
        next();
    }catch(err){
        next(err);
    }
    
}