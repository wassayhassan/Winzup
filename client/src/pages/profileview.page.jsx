import React from "react";
import NavBar from "../components/navbar.component";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import HeaderPic from "../components/HeaderPic.component";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ProfilePic from "../components/ProfilePic.component";
import EditProfileModal from "../components/profileeditmodal.component";
import BlogList from "../components/blogList.component";
import { getUserData } from "../slices/userSlice";
function ProfileView(){
    const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userData} = useSelector((state)=> state.auth);
  const [profileData, setProfileData] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);


   useEffect(()=> {
    console.log(id);
    axios.post(`/api/user/data/${id}`).then((response)=> {
       setProfileData(response.data); 
    })
   }, [])

    useEffect(()=> {
       if(!userData){
        navigate('/auth/user/login');
       }
      axios.post(`/api/user/blogs/${id}`).then((response)=> {
        setUserBlogs(response.data);
      })
    }, []);

  return (

    <div className="container bg-primary min-h-screen flex flex-row w-screen">
          <div className="fixed bottom-0 z-10 md:z-0 lg:z-0 2xl:z-0 sm:sticky md:sticky lg:sticky bg-white sm:bg-transparent md:bg-transparent lg:bg-transparent 2xl:bg-transparent w-fit sm:w-20 md:w-20 lg:w-20 2xl:w-20">
            <NavBar />
         </div>
    <div className="mt-3 content-container sm:p-2 md:p-2 lg:p-2 2xl:p-2 sm:m-2 md:m-2 lg:m-2 2xl:m-2 sm:ml-3 md:ml-3 lg:ml-3 2xl:ml-3 w-full">
        <div className="heading-container">
            <p className="font-bold text-blue-500 text-2xl text-left ml-2">Profile</p>
        </div>
        <div className="mt-3 header-container bg-white flex flex-row justify-between rounded-md p-3">
        <div className="userprofile-container w-full">
          
            <div className="headerphoto-container h-36 w-full m-1 border border-black rounded-md">
                <HeaderPic userData={profileData}/>
            </div>
           
           <div className="userd-container flex flex-row justify-between items-start">
            <div className="left-conatiner">
            <div className="profileimg-container h-28 rounded-full m-1 border border-black">
              <ProfilePic userData={profileData} />
            
            </div>
                <div className="userfullname-container">
                        <p className="font-bold text-black">{profileData && profileData.firstname+' '+ profileData.lastname}</p>
                        <p className="font-light text-sm text-black">{profileData && profileData.username}</p>
                    </div>
                    <div className="dates-container">
                        <div className="borndate-contaienr">October 22, 2001</div>
                        <div className="joindate-container">July 1, 2016</div>
                    </div>
                    <div className="location-container">{profileData && profileData.location}</div>
                    <div className="friends-container"> Friends {profileData && profileData.friends && profileData.friends.length}</div>

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
        
    </div>
</div>
  )
}
export default ProfileView;