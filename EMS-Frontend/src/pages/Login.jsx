import axios from "axios";
import React, { useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Login = () => {
  const [login,setLogin]=useState(false);
  const [error,setError]=useState(null);
  const email=useRef();
  const password=useRef();
  const username=useRef();
  const formState=useRef();
  const Navigate=useNavigate();

  const handleRegister=()=>{
    setLogin(!login);
  }

  const handleRegisterAccount = async(e) => {
    e.preventDefault();
    // Logic for registering an account
    // If there's an error, set it using setError
    // Example: setError("Registration failed. Please try again.");
    const user={
      email: email.current.value,
      password: password.current.value,
      username: username.current.value
    }
    // Here you would typically send the user data to your backend for registration
    try{
      // Simulating a registration API call
      setError(null); // Clear any previous errors
      const response=await axios.post(BASE_URL+"register",user);
      formState.current.reset(); // Reset the form after successful registration
      setLogin(!login); // Toggle login state
    }
    catch(err){
      if(err.response){
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      }else{
        setError(err.message);
      }
      console.log(err);
    }
  }

  const handleloginAccount = async(e) => {
    e.preventDefault();
    // Logic for logging in to an account
    // If there's an error, set it using setError
    // Example: setError("Login failed. Please check your credentials.");
    const user={
      email: email.current.value,
      password: password.current.value
    }
    try{

      // Here you would typically send the user data to your backend for login
      await axios.post(BASE_URL+"login",user,{withCredentials:true});
      
      formState.current.reset(); // Reset the form after successful login
      Navigate("/");

    }
    catch(err){
      if(err.response){
        setError(`Error: ${err.response.status} ${err.response.statusText}`);
      }else{
        setError(err.message);
      }
      console.log(err);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  return (
    <div className="flex justify-around min-h-screen bg-[#0F1B2D] text-white">
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
      <div className="my-10 pt-30 h-[90vh] flex flex-col  items-center w-1/3 bg-white rounded-3xl p-10 text-black">
        <div className="flex items-center mb-6">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-6 h-6 bg-blue-500 rounded-sm" />
            <div className="w-6 h-6 bg-blue-500 rounded-sm" />
            <div className="w-6 h-6 bg-blue-500 border border-gray-300 rounded-sm" />
            <div className="w-6 h-6 bg-blue-500 rounded-sm" />
          </div>
          <p className="ml-4 text-2xl font-bold"><span className="">ERM</span></p>
        </div>

        <h2 className="text-3xl font-bold mb-1" >Welcome Back</h2>
        <p className="text-lg text-gray-600 mb-6">Sign {login ? "in" : "up"} to your account</p>

        <form className="w-full max-w-sm" ref={formState}> 
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              ref={email}
            />
          </div>

          {
            login &&
         
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-1">UserName</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              ref={username}
            />
          </div>
           }
          <div className="mb-4">
            <label className="block text-gray-700 text-lg mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              ref={password}
            />
          </div>
          <button
            type="submit"
            className="w-full my-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition cursor-pointer"
            onClick={login ? handleRegisterAccount : handleloginAccount}
          >
            {login ? "Sign up" : "Sign in"}
          </button>
                 
          {error && 
          <div className="text-red-500 text-2xl font-bold mb-4">
            {error}
          </div>}
          <div className="flex justify-between text-lg text-gray-500 mt-4">
            <a href="#" className="hover:underline" onClick={handleRegister}> 
              {login ? "Already have an account?" : "New here? Register now!"}
            </a>
            <a href="#" className="text-blue-500 hover:underline" onClick={handleRegister}> 
              {login ?  "Sign in" : "Sign up"}
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
