const bcrypt=require('bcryptjs');
const { validateRegister, validateLogin } = require('../utils/validate');
const User = require('../models/User');
const jwt=require('jsonwebtoken');

const authRegister=async(req,res)=>{
    try{
        // Validate the registration data
        validateRegister(req);
        const {username,email,password}=req.body;
        //Hash the password
        const hashedPassword=await bcrypt.hash(password,10);
        //Creating instance of user model
        // and saving it to the database
        // If the email already exists, it will throw an error
        const NewUser=new User({
            username,
            email,
            password:hashedPassword
        });

        await NewUser.save();

        res.json({
            success: true,
            message: "User registered successfully"})

    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}


const authLogin=async(req,res)=>{
    try{
        validateLogin(req);
        const {email,password}=req.body;

        // Find the user by email
        const UserData=await User.findOne({email:email});
        if(!UserData ){
            throw new Error("User not found");
        }

        // Check if the password matches
        const isMatch=await bcrypt.compare(password,UserData.password);
        if(!isMatch){
            throw new Error("Invalid credentials");
        }

        // Generate a JWT token
        const token=jwt.sign({id:UserData._id, role:UserData.role},process.env.JWT_SECRET,{expiresIn: '10days'});

        // Set the token in a cookie
        // Adjust the cookie settings as needed
        res.cookie('token',token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict' // Adjust as needed,
            
        })

        // Decode the token to get user data
        // This is optional, you can send the user data directly
        // or just the token
        // const decodedToken=jwt.decode(token);
        // If you want to verify the token, you can use jwt.verify
        // but this is not necessary for sending the response
        // const decodedToken=jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedToken);
        // This decoded token is used to check what is actually in token

        // Send the response
        res.json({
            success:true,
            message:"User logged in successfuly",
            token:token,
            UserData:{
                _id: UserData._id,
                username: UserData.username,
                email: UserData.email,
                role: UserData.role
            }
        })

        
    }
    catch(err){
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
}

module.exports={authRegister,authLogin};