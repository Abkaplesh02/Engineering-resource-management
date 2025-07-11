import { Route, Router , Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";

const Body=()=>{
    return (
        <div>     
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home/>} />
                    {/* Add more routes as needed */}
                </Routes>
        </div>
    )
}

export default Body;