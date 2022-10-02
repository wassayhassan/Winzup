import React, { useEffect } from 'react';
import DashNav from '../components/dashbarnav.component';
import DashContent from '../components/dashcontent.component';
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'

function DashBoard(){
    const navigate = useNavigate();
    const {userData} = useSelector(state=> state.auth)
    useEffect(()=> {
      if(!userData){
        navigate('/auth/user/login');
      }else if(userData.adminStatus !== 'true' ){
        navigate('/auth/user/login'); 
      }
    }, [])
    return (
        <div className='dashboard-container  flex flex-row'>
           <DashNav />
           <DashContent />
        </div>
    )
}
export default DashBoard;