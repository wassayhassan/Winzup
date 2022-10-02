import React from "react";
import { Divider } from "@mui/material";
import arrow from "../icons/arrow-right.svg";
import logo from "../logos/logo.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {register, reset} from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

function SignUp(){

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {userData, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth);

   const [registerVals, setregisterVals] = useState({
      firstname: null,
      lastname: null,
      username: null,
      email: null,
      password: null,
      password2: null
    });
    const [err, seterr] = useState('');

    function RegisterUser(){
      if(registerVals.password === registerVals.password2){
         dispatch(register(registerVals))
      }else{
         seterr('Password mismatch')
      }
      
    }

    useEffect(()=> {
        if(isSuccess && message === ''){
          navigate('/auth/user/login');
        }
        dispatch(reset);
    }, [userData, isError, isLoading, isSuccess, message]);
   
      
   
      function handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        setregisterVals({...registerVals, [name] : value});
      }
   

    return (
        <div className="container bg-primary h-full min-w-full min-h-screen flex flex-row">
           <div className="left-container p-1 w-full lg:w-2/3 ">
             <div className="heading-container p-2">
                <p className="text-blue-500 text-3xl font-bold lg:text-left ml-8 md:text-center sm:text-center"> Sign Up</p>
             </div>

             <div className="sociallogin-container flex flex-row ml-5">

             </div>
             <div className="divider-container ml-8 my-8">
                <Divider color = "3FA796" sx={{ height: 2, width: '10em' }} />
             </div>
             <div className="error-container">
                  <p>{message}</p>
                 </div>
             <div className="reg-container flex flex-row justify-center flex-wrap lg:w-2/3">
                 
                 <div className="field-container p-3">
                    <input type="text" name="firstname" className="bg-inputBack p-1 w-60 h-10 rounded-md outline-none placeholder:text-center" placeholder="First Name" onChange={handleChange} />
                 </div>
                 <div className="field-container p-3">
                    <input type="text" name="lastname" className="bg-inputBack p-1 h-10 w-60 rounded-md outline-none placeholder:text-center"  placeholder="Last Name" onChange={handleChange} />
                 </div>
                 <div className="field-container p-3">
                    <input type="text" name="username" className="bg-inputBack p-1 h-10 w-60 rounded-md outline-none placeholder:text-center" placeholder="Username" onChange={handleChange} />
                 </div>
                 <div className="field-container p-3">
                    <input type="text" name="email" className="bg-inputBack p-1 h-10 w-60 rounded-md outline-none placeholder:text-center" placeholder="Email" onChange={handleChange} />
                 </div>
                 <div className="field-container p-3">
                    <input type="password" name="password" className="bg-inputBack p-1 h-10 w-60 rounded-md outline-none placeholder:text-center" placeholder="Password" onChange={handleChange} />
                 </div>
                 <div className="field-container p-3">
                    <input type="password" name="password2" className="bg-inputBack p-1 h-10 w-60 rounded-md outline-none placeholder:text-center" placeholder="Confirm Password" onChange={handleChange} />
                 </div>
            </div>
            <div className="agreecheck-conainer flex flex-row p-4 relative ml-1" >
               <div className="flex flex-col justify-center">
               <input type="checkbox" name="check" id="check" className=" scale-150 rounded-md" />

               </div>
                <p className="m-3">I have read and agreed to <span className="text-fbBack cursor-pointer">Terms of Service and Privacy Policy</span></p>
            </div>
            <div className="signup-container px-3 py-2 mb-4">
               <div className="signup bg-blue-500 w-10 p-2 rounded-md" onClick={ RegisterUser} >
               <img src={arrow} alt="" />
               </div>
            </div>
            
           </div>
           <div className="right-container invisible w-0 lg:visible lg:w-1/3    ">
              <div className="polygon bg-blue-300 clip-polys h-full relative w-full">
                <img src={logo} alt="" className="absolute -bottom-10"  />
              </div>
           </div>
        </div>
    )
}
export default SignUp;