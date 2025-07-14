const User=require('../models/User');
const bcryptjs=require('bcryptjs');
const jwt=require("jsonwebtoken");
const  registerUser=async(req,res)=>{

    const{name,email,password}=req.body;
    const saltRound=10;
    
    try{
        const existingUser=await User.findOne({email})
         if(email.length==0||name.length==0||password.length==0){
            throw new Error("All fields are required");
        }
        if(existingUser){
            throw new Error('This Email is already registered');
        }
       
        const salt=await bcryptjs.genSalt(saltRound);
        const hashedPassword=await bcryptjs.hash(password,salt);

    const newUser = new User({
        name,
        email,
        password:hashedPassword
    });
    await newUser.save();
    return res.status(201).json({msg:"Account is created successfully",success:true});
   
}
catch(error){
    console.log(error);
    return res.status(400).json({
        msg:error.message,
        success:false
    });
}
}
const loginUser=async(req,res)=>{  
    const{email,password}=req.body;
    const secretKey=process.env.secret_key;
    console.log("secretKey",secretKey);

    try{

        const existingUser=await User.findOne({email});
        if(email.length==0||password.length==0){
            throw new Error("All fields are required");
        }
        if(!existingUser){

            throw new Error("Email is not registered")

        }
        const isCorrect=await bcryptjs.compare(password,existingUser.password);

        if(isCorrect){     
            const accessToken=jwt.sign({email},secretKey,{expiresIn:"15min"});
          
            return res.status(200).json({msg:"login successfully",success:true});
        }
        
        return res.json({msg:"Invalid credentials",success:false});


    }
    catch(error){

        return res.status(400).json({msg:error.message})
    }

}
module.exports={registerUser,loginUser}