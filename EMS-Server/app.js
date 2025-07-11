const express=require('express');
const connectDB = require('./src/database/database');
const cookieParser = require('cookie-parser');
const app=express();
const cors=require('cors');
const authRouter = require('./src/routes/register');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());



// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true
// }));

app.use("/",authRouter);


connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 7777 , ()=>{
        console.log("Server is running on PORT "+process.env.PORT);
    })
})
.catch((err)=>{
    console.error("Database connection failed: ", err);
})

