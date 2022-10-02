import React from "react";
import {AiOutlineLike, AiOutlineComment, AiOutlineShareAlt} from 'react-icons/ai';
import {format} from 'timeago.js'
import axios from 'axios';
import {useState, useEffect, useRef} from 'react';
import BlogEditDots from "./blogeditdots.component";
import BlogImages from "./blogimages.component";
import CommentModal from "./commentmodal.component";
import { Button } from "@mui/material";
import {useSelector} from 'react-redux';
import Like from "./like.component";
import SharePost from "./share.component";


function BlogCard({blog}){
  const  {userData} = useSelector((state)=> state.auth); 
  const [userLiked, setUserLiked] = useState(null);
  const [authorData, setAuthorData]  = useState({});
  let likeRef = useRef(null);

  likeRef = blog.likes && blog.likes.find(bloglike=> bloglike.like === userData._id);

  

  
  
   
  

  function likeBlog(){
    let data = {
      userid: userData._id
    }
    axios.post(`/api/blog/like/${blog._id}`, data).then((response)=> {
      console.log(response);
      setUserLiked(true);
      axios.post('/api/notification/create', {receiverId: blog.authorid, senderId: userData._id, message: `You Post was liked by ${userData.firstname +" "+ userData.lastname}`}).then((respon)=> {
        console.log(respon);
      })
    })
  }
  useEffect(()=> {

  }, [])

  useEffect(()=> {
   
   axios.post(`/api/user/data/${blog.authorid}`).then((response)=> {
      setAuthorData(response.data);
   })
  },[])

    return (
        <div className="card-container bg-white p-2 m-2 rounded-md flex flex-col">
            <div className="first-container flex flex-row justify-between border-b border-b-primary">
              <div className="author flex flex-col ">
                <div className="flex flex-row p-1">
                  <div className="p-1 rounded-full">
                    <img src={authorData.profilepic? `/api/user/photo/${authorData.profilepic}`: `/api/user/photo/profilepic-general.png`} alt="" className=' w-10 h-10 rounded-full' />
                  </div>
                  <div className="flex flex-col justify-center p-1">
                     <p className="font-semibold text-base">{blog.authorfirstname+' '+blog.authorlastname}</p>
                     <p className="text-left text-sm font-light">{format(blog.createdAt)}</p>

                  </div>
                  
                </div>

              </div>

              
              <div className="postactions-container">
                <div className="moreactions-container">
                   <BlogEditDots postId={blog._id} />
                </div>
              </div>
            </div>

            <div className="time-container font-thin text-sm"></div>
            <div className="blogtitle text-left font-semibold bg-white p-1 m-1 rounded-md">{blog.blogData}</div>
            <div className="blogimages-container flex flex-row flex-wrap">
              <BlogImages images = {blog.images} />
            </div>
            <div className="useraction-container mt-1 flex flex-row border-t-2">
              <Like userLiked={likeRef} likeBlog = {likeBlog} ulike = {userLiked} />
              <div className="comment w-1/3 hover:bg-slate-50 rounded-md p-1 flex flex-row justify-center bg-white ml-1 mr-1"><CommentModal blogid = {blog._id} /></div>
              <SharePost postId={blog._id} />
              {/* <div className="share w-1/3 hover:bg-slate-50 rounded-md p-1 flex flex-row justify-center bg-white ml-1 mr-1"><Button endIcon={<AiOutlineShareAlt  size='1.5em' color="#000"/>}><p className="text-black">SHARE</p></Button></div> */}
            </div>
        </div>
    )

}
export default BlogCard;