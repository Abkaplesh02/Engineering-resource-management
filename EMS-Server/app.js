const express=require('express');
const connectDB = require('./src/database/database');
const cookieParser = require('cookie-parser');
const app=express();
const cors=require('cors');
app.use(cors({
  origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
const userRouter = require('./src/routes/user');
require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRouter);


connectDB().then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 7777 , ()=>{
        console.log("Server is running on PORT "+process.env.PORT);
    })
})
.catch((err)=>{
    console.error("Database connection failed: ", err);
})

