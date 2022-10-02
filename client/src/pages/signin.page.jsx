import React from "react";
import { Divider } from "@mui/material";
import arrow from "../icons/arrow-right.svg";
import logo from "../logos/logo.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {login, reset} from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import {getUserDataByToken} from '../slices/userSlice';
import {Spinner, Alert} from 'flowbite-react';


function SignIn(){
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [loading, setloading] = useState(null);
   const [serverError, setServerError] = useState(null);
   const {userData, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth);


   const [loginVals, setloginVals] = useState({
      email: null,
      password: null
    });

    function SubmitLogin(){
      setloading(true);
      dispatch(login(loginVals))
    }
    useEffect(()=> {
        if(userData !== null && isSuccess === true && message === ''){
         if(userData){
            if(userData.verifiedStatus === 'false'){
              navigate('/user/verification/page');
            }else{
               navigate('/');
            }
         }

        }
        if(message){
         setloading(false);
        }
      
        if(isError){
         // seterrVal([message]);
        }
        if(isLoading){
         // setloading(['Signing In'])
        }
        dispatch(reset);
    }, [userData, isError, isLoading, isSuccess, message]);
   
      
   
      function handleChange(e){
        let name = e.target.name;
        let value = e.target.value;
        setloginVals({...loginVals, [name] : value});
      }
   

    return (
        <div className="container bg-primary h-full min-w-full min-h-screen flex flex-row">
           <div className="left-container p-2 w-full lg:w-2/3 ">
             <div className="heading-container p-2">
                <p className="text-blue-500 text-3xl font-bold lg:text-left ml-8 md:text-center sm:text-center"> Sign In</p>
             </div>

             <div className="sociallogin-container flex flex-row ml-5">

             </div>
             <div className="divider-container ml-8 my-8">
                <Divider sx={{ height: 2, width: '10em' }} />
             </div>
             <form onSubmit={SubmitLogin}>
             <div className="login-container p-2 flex flex-col lg:w-2/3">
               <div className="error-container p-3 w-80">
                 {message ?  <Alert color="warning">
                     <span>
                        <span className="font-medium">
                          {message? 'Login Failed!  ': '' } 
                        </span>
                        {message}
                     </span>
                  </Alert> : ''}
                  {serverError ?  <Alert color="warning">
                     <span>
                        <span className="font-medium">
                          {message? 'Login Failed!  ': '' } 
                        </span>
                        {'Server Error'}
                     </span>
                  </Alert> : ''}
                 
               </div>
              

              
                 <div className="field-container p-3 flex flex-row justify-start">
                    <input type="text" name="email" className="bg-inputBack p-1 h-10 w-72 rounded-md outline-none placeholder:text-center " placeholder="Email" onChange={handleChange} />
                 </div>
                 <div className="field-container p-3 flex flex-row justify-start relative">
                    <input type="password" name="password" className="bg-inputBack p-1 h-10 w-72 rounded-md outline-none placeholder:text-center" placeholder="Password" onChange={handleChange} />
                    <p className="font-light text-sm absolute top-14 left-48">Forgot Password?</p>
                 </div>
                 
            </div>
           
          
            <div className="signup-container px-3 py-2 mb-4 m-1 p-1">
               <div className="signup bg-blue-500 w-10 p-2 rounded-md cursor-pointer" onClick={ SubmitLogin
                  } >
               <img src={arrow} alt="" />
               </div>
               <div className="loading-container">
                 
                  {loading? <Spinner />: ''}
                 
               </div>
            </div>
            </form>
            
           </div>
           <div className="right-container invisible w-0 lg:visible lg:w-1/3    ">
              <div className="polygon bg-blue-300 clip-polys h-full relative w-full">
                <img src={logo} alt="" className="absolute -bottom-10"  />
              </div>
           </div>
        </div>
    )
}
export default SignIn;