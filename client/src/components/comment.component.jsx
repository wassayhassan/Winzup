import React from 'react';
import {useState, useEffect} from 'react'
import axios from 'axios';
import {format} from 'timeago.js'

function  Comment({comment}){

const [author, setAuthor] = useState({});
    useEffect(()=> {
         axios.post(`/api/user/data/${comment.authorid}`).then((response)=> {
           setAuthor(response.data);
         }).catch((err)=> {
            console.log(err);
         })
    }, [])
   return (
    <div className='bg-slate-50 m-1 rounded-md'>
        <div className='flex flex-row'>
            <div className='auhorimg m-1'>
            <img src={author.profilepic? `/api/user/photo/${author.profilepic}`: `/api/user/photo/profilepic-general.png`} alt="" className='h-8 w-8 rounded-full' />
            </div>
            <div className='authorname flex flex-col'>
              <p className=''>{author.firstname + " " + author.lastname}</p>
              <p className='font-light text-xs'>{format(comment.createdAt)}</p>
            </div>
        </div>
        <div className='commentdetails-container ml-3'>
          <p className=''>{comment.comment}</p>
        </div>
        
    </div>
   )
}
export default Comment;