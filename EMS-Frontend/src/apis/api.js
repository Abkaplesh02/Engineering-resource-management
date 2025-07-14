import axios from "axios"
const registerUser = async (formData) => {
  
    const{name,email,password}=formData;
    try {
        const response = await axios.post('http://localhost:7777/api/user/register', {
            name,
            password,
            email
        });


      console.log("response",response);

        return {success:response.data.success,  msg: response.data.msg };
    } catch (error) {

        
        return {success:false,msg:error.response.data.msg};
    }
};
const loginUser=async (formData)=>{
    const{email,password}=formData;
    try{
     const response = await axios.post('http://localhost:7777/api/user/login',{
        email,
        password
    })
    console.log("response",response);
    return {success:true,msg:"Login successfully"}

    }
    catch(error){
          return {success:false,msg:error.response.data.msg};

    }
   


}
export {registerUser,loginUser};
