import React, { useState} from "react";
import { registerUser,loginUser } from "../apis/api";
import { toast } from 'react-toastify';

const Login = () => {

  const [login,setLogin]=useState(true);
  const [error,setError]=useState(null);
   const[formData,setFormData]=useState({
    name:'',
    email:'',
    password:''

   })
  
  const toggleLogin=()=>{
    setLogin(!login);
    setFormData({
      name:"",
      email:"",
      password:"",
    })
  }
  const handleInputChange=(e)=>{
    const{name,value}=e.target;
    setFormData((prev)=>({...prev,[name]:value}));


  }
const handleSubmit = async (e) => {
  e.preventDefault();   

  try {
    let result;
    console.log("isLogin",login);
   {!login ?  result=await registerUser(formData):result=await loginUser(formData)} 

  //  result=await registerUser(formData)
    console.log("result",result);
    if(result.success){
     toast.success(result.msg);
     setFormData({
      name:'',
      email:'',
      password:''

     })
    }
    else{

      throw new Error(result.msg)
    }
  } catch (err) { 

            console.log(err);
          toast.error(err.message)
  }
};

  return (
    <div className="flex justify-around  bg-[#0F1B2D] text-white h-[100vh]">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center w-1/2 p-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-8 h-8 bg-blue-500 rounded-sm" />
            <div className="w-8 h-8 bg-blue-300 rounded-sm" />
            <div className="w-8 h-8 bg-white rounded-sm" />
            <div className="w-8 h-8 bg-[#0F1B2D] border border-gray-400 rounded-sm" />
          </div>
          <h1 className="text-4xl font-semibold ml-3">Engineering<br />RM System</h1>
        </div>
        <p className="text-3xl text-center text-gray-300 mt-4">
          Manage teams. Track capacity. <br /> Deliver faster.
        </p>
        <p className="absolute bottom-8 text-sm text-gray-300 font-bold">© 2025 ERM System</p>
      </div>

      {/* Right Side */}
      <div className="my-10   flex flex-col  items-center w-1/3 bg-white rounded-3xl p-10 text-black p-[3] h-[90vh] ">
        <div className="flex items-center mb-6">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-6 h-6 bg-blue-500 rounded-sm" />
            <div className="w-6 h-6 bg-blue-500 rounded-sm" />
            <div className="w-6 h-6 bg-blue-500 border border-gray-300 rounded-sm" />
            <div className="w-6 h-6 bg-blue-500 rounded-sm" />
          </div>
          <p className="ml-4 text-2xl font-bold"><span className="">ERM</span></p>
        </div>

        <h2 className="text-3xl font-bold mb-1">Welcome Back</h2>
        <p className="text-lg text-gray-600 mb-6">Sign {!login ? "up" : "in"} to your account</p>

        <form className="w-full max-w-sm " onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-1" >Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {
            !login &&
         
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              name="name"
               value={formData.name}
              onChange={handleInputChange}
            />
          </div>
           }
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button
         
            className="w-full my-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
          >
            {!login ? "Sign up" : "Sign in"}
          </button>
                 
          {/* {error && 
          <div className="text-red-500 text-xl font-bold mb-4">
            {error}
          </div>} */}
          <div className="flex gap-5 text-lg text-gray-500  justify-center">
            <span > 
              {!login ? "Already have an account?" : "New here? Register now!"}
            </span>

            <span  className="text-blue-500 hover:underline cursor-pointer" onClick={toggleLogin}> 
              {!login ?  "Sign in" : "Sign up"}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
