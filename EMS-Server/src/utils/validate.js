const validator= require('validator');

const validateRegister=(req)=>{
    const {username,email,password}=req.body;

    if(!username){
        throw new Error("Username is required");
    }

    if(!email){
        throw new Error("Email is required");
    }

    if(!password){
        throw new Error("Password is required");
    }

    if(!validator.isEmail(email)){
        throw new Error("Invalid email format");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol");
    }
    return true;
} 


const validateLogin=(req)=>{
    const {email,password}=req.body;

    if(!email){
        throw new Error("Email is required");
    };
    if(!password){
        throw new Error("Password is required");
    }
    if(!validator.isEmail(email)){
        throw new Error("Invalid email format");
    }
    return true;
}
module.exports={validateRegister,validateLogin};