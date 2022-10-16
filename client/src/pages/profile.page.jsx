import React from "react";
import NavBar from "../components/navbar.component";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import HeaderPic from "../components/HeaderPic.component";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ProfilePic from "../components/ProfilePic.component";
import EditProfileModal from "../components/profileeditmodal.component";
import BlogList from "../components/blogList.component";
import { getUserData } from "../slices/userSlice";
import {Spinner, Button} from 'flowbite-react';
function UserProfile(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {blogs, isLoading, isError, isSuccess, message} = useSelector((state)=> state.blog);
  const {userData} = useSelector((state)=> state.auth);
  const [userBlogs, setUserBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


 

    useEffect(()=> {
       if(!userData){
        navigate('/auth/user/login');
       }
      axios.post(`/api/user/blogs/${userData._id}/${currentPage}`).then((response)=> {
        setUserBlogs(response.data.blogs);
        setTotalPages(response.data.pages);
        setCurrentPage(response.data.currentpage);
        setLoading(false);
      })
    }, []);

    function loadMoreBlogs(){
      setCurrentPage(currentPage + 1);
      console.log(currentPage);
      setLoading(true);
      axios.post(`/api/user/blogs/${userData._id}/${currentPage}`).then(response=> {
        setUserBlogs(prev=> prev.concat(response.data.blogs));
        setTotalPages(response.data.pages);
        setCurrentPage(response.data.currentpage);
        setLoading(false);
      })
}

  return (

    <div className="container bg-primary min-h-screen flex flex-row w-screen">
          <div className="fixed w-full bottom-0 z-10 md:z-0 lg:z-0 2xl:z-0 sm:sticky md:sticky lg:sticky bg-white sm:bg-transparent md:bg-transparent lg:bg-transparent 2xl:bg-transparent sm:w-20 md:w-20 lg:w-20 2xl:w-20">
            <NavBar />
         </div>
    <div className="mt-3 content-container sm:p-2 md:p-2 lg:p-2 2xl:p-2 sm:m-2 md:m-2 lg:m-2 2xl:m-2 sm:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 w-full">
        <div className="heading-container">
            <p className="font-bold text-blue-500 text-2xl text-left ml-2">Profile</p>
        </div>
        <div className="mt-3 header-container bg-white flex flex-row justify-between rounded-md p-3">
        <div className="userprofile-container w-full">
          
            <div className="headerphoto-container h-36 w-full m-1 border border-black rounded-md shadow-lg relative">
                <HeaderPic userData={userData}/>
                <ProfilePic userData={userData} />
            </div>
           
           <div className="userd-container flex flex-row justify-between items-start">
            <div className="left-conatiner">
            <div className="profileimg-container h-10 rounded-full m-1  relative">
              
            
            </div>
                <div className="userfullname-container ml-4">
                        <p className="font-bold text-black">{userData && userData.firstname+' '+ userData.lastname}</p>
                        <p className="font-light text-sm text-black">{userData && '@'+userData.username}</p>
                    </div>
                    <div className="dates-container">
                        <div className="borndate-contaienr">October 22, 2001</div>
                        <div className="joindate-container">July 1, 2016</div>
                    </div>
                    <div className="location-container">{userData && userData.location}</div>
                    <div className="friends-container font-semibold"> Friends <span className="font-normal">{userData&& userData.friends && userData.friends.length}</span> </div>

            </div>
            <div className="right-container">
              <EditProfileModal />
            </div>
             
           </div>
           
        </div>
        
        
        </div>
        <div className="userblogs-container sm:w-4/5 md:w-4/5 lg:w-4/5 2xl:w-4/5">
           <BlogList blogs = {userBlogs}/>
        </div>
        <div className="flex flex-row justify-center">
       {(totalPages > currentPage && blogs.length > 0) &&  <Button onClick={loadMoreBlogs}>Load More</Button>}   
        </div>
        <div className="flex flex-row justify-center">
           {loading &&   <Spinner aria-label="Medium sized spinner example" size="md" />}
        </div>
        
    </div>
</div>
  )
}
export default UserProfile;