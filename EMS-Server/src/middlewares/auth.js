const jwt = require("jsonwebtoken");
const verifyToken=(req,res,next)=>{

    const authHeader=req.headers.authorization;

    if(!authHeader){

        return res.status(401).json({msg:"Access denied"});
    }

    const token=authHeader.split(' ')[1];

    try{

        const decoded=jwt.verify(token,process.env.secret_key);
        req.user=decoded;
        next();

    }
    catch(error){

        return res.status(401).json({msg:error});

    }



}
module.exports=verifyToken;