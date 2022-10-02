import React, { useEffect } from 'react';
import { AiOutlineUsergroupAdd, AiOutlineCloudServer } from 'react-icons/ai';
import {IoIosPerson} from 'react-icons/io';
import axios from 'axios';
import { useState } from 'react';

function DashWidgets(){
  const [userCount, setUserCount] = useState(null);
  const [postCount, setPostCount] = useState(null);
  const [visitorCount, setVisitorCount] = useState(null);
 useEffect(()=> {
   axios.post('/api/user/count').then((response)=> {
    setUserCount(response.data);
   })
   axios.post('/api/blog/count').then((response)=> {
      setPostCount(response.data);
   })
   axios.post('/api/ips/count').then((response)=> {
    setVisitorCount(response.data);
 })
 }, []);


    return (
    <div className='flex flex-row'>

    <div className='userWidget h-28 w-56 bg-red-200 rounded-lg m-2'>
        <div className='flex flex-col'>
            <div className=' flex flex-row justify-center mt-2'>
                <div className='bg-red-400 rounded-lg m-1'>
                <AiOutlineUsergroupAdd size="2em" />
                </div>
             
              <p className='font-semibold text-red-700 text-lg'>Users</p> 
            </div>
          
          <p className='font-bold text-red-700 text-2xl'>{userCount}</p>
        </div>
    </div>
    <div className='postWidget h-28 w-56 bg-green-200 rounded-lg m-2'>
    <div className='flex flex-col'>
            <div className=' flex flex-row justify-center mt-2'>
                <div className='bg-green-400 rounded-lg m-1'>
                <AiOutlineUsergroupAdd size="2em" />
                </div>
             
              <p className='font-semibold text-green-700 text-lg'>Posts</p> 
            </div>
          
          <p className='font-bold text-green-700 text-2xl'>{postCount}</p>
        </div>
    </div>
    <div className='visitorWidget h-28 w-56 bg-teal-200 rounded-lg m-2'>
    <div className='flex flex-col'>
            <div className=' flex flex-row justify-center mt-2'>
                <div className='bg-teal-400 rounded-lg m-1'>
                <AiOutlineCloudServer size="2em" />
                </div>
             
              <p className='font-semibold text-teal-700 text-lg'>Requests Served</p> 
            </div>
          
          <p className='font-bold text-2xl text-teal-700'>{visitorCount}</p>
        </div>
    </div>

    </div>
    )
}
export default DashWidgets