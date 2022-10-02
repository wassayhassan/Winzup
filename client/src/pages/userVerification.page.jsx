import React from 'react';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput, Button, Alert} from 'flowbite-react';
import { getToken } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyTimer from '../components/timer.component';
import { HiInformationCircle } from 'react-icons/hi';

function VerificationPage(){
    const {userData} = useSelector(state=> state.auth);
    const [verificationCode, setVerificationCode] = useState('');
    const [userCode, setUserCode] = useState('');
    const [wrongPass, setWrongsPass] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [time, setTime] = useState(null);

    function sendAgain(){
        axios.post('/api/user/verification/code', {recipientmail: userData.email}).then((response)=> {
            setVerificationCode((response.data.toString()));
        })
    }

    useEffect(()=> {
        if(userData){
            if(userData.verifiedStatus === 'false'){
                axios.post('/api/user/verification/code', {recipientmail: userData.email}).then((response)=> {
                    setVerificationCode((response.data.toString()));
                })
               }
        }else{
            navigate('/auth/user/login');
        }

    }, []);
    useEffect(()=> {
        const date = new Date();
        setTime(date.setSeconds(date.getSeconds() + 60));
        setTimeout(()=> {
            setVerificationCode(''); 
        }, 60000)
    }, [verificationCode])
    function handleInputChange(e){
      setUserCode(e.target.value)
    }
    function handleSubmit(){
        console.log(verificationCode)
        console.log(userCode);
        if(userCode === verificationCode){
            axios.post('/api/user/update/verificationstatus', {userid: userData._id, verifiedStatus: "true"}).then(()=> {
                dispatch(getToken()).then(()=> {
                  navigate('/');
                })
            })
        }else{
            setWrongsPass(true);
        }
    }
    return (
        <div className='container flex flex-row justify-center items-start'>
            <div className='flex flex-col mt-20'>
                <div className='mt-20 m-5'>
                    <p className='font-semibold text-2xl'>You need to verify you email in order to use the service</p>
                   <p className=' text-sm'>An email has been sent to you. Check your inbox for verification Code</p>
                </div>
                <div>
                { wrongPass && <Alert
                    color="failure"
                    icon={HiInformationCircle}
                    >
                    <span>
                        <span className="font-medium">
                        Error!
                        </span>
                        Incorrect Password
                    </span>
                </Alert>}
                </div>
                <div>
                <TextInput
                        id="small"
                        type="number"
                        sizing="md"
                        onChange={handleInputChange}
                        />
                </div>
                {verificationCode.length > 2 && <MyTimer  expiryTimestamp={time}/>}
                <div className='flex flex-row justify-end p-2'>

                <div className='mx-2'>
                    <Button onClick={handleSubmit} >
                        
                        Submit
                    </Button>
                </div>
                <div className='mx-2'>
                  <Button onClick={sendAgain}> Send Again</Button>
                </div>
                
                </div>
            </div>
      
        </div>
    )
}
export default VerificationPage;