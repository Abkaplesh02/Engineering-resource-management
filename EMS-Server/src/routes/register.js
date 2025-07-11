const express=require('express');
const { authRegister, authLogin } = require('../controller/authCheck');
const authRouter=express.Router();


authRouter.post("/register",authRegister);


authRouter.post("/login",authLogin);

module.exports=authRouter;