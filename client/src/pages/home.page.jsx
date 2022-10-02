import React from "react";
import NavBar from "../components/navbar.component";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import UploadModal from "../components/uploadModal.component";
import { useNavigate } from "react-router-dom";
import { getAll } from "../slices/blogSlice";
import {getUserData} from "../slices/userSlice"
import {Button, Spinner} from 'flowbite-react';
import BlogList from "../components/blogList.component";
import RightBar from "../components/rightbar.component";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
function Home(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const {userData} = useSelector((state)=> state.auth);
  const [blogs, setBlogs] = useState([]);
 

    useEffect(()=> {
       if(!userData){
        navigate('/auth/user/login');
       }else if(userData.verifiedStatus === 'false'){
        navigate('/user/verification/page');
       }else{
        setLoading(true);
        axios.post(`/api/blogs/get/${currentPage}`).then(response=> {
          setBlogs(response.data.blogs);
          setTotalPages(response.data.pages);
          setCurrentPage(response.data.currentpage);
          setLoading(false);
        })
       }
    }, []);

    function loadMoreBlogs(){
          setCurrentPage(currentPage + 1);
          console.log(currentPage);
          setLoading(true);
          axios.post(`/api/blogs/get/${(currentPage + 1)}`).then(response=> {
            setBlogs(prev=> prev.concat(response.data.blogs));
            setTotalPages(response.data.pages);
            setCurrentPage(response.data.currentpage);
            setLoading(false);
          })
    }

  return (
    <>
    <div className=" container bg-primary min-h-screen flex flex-row relative">
      <div className="fixed bottom-0 z-10 md:z-0 lg:z-0 2xl:z-0 sm:sticky md:sticky lg:sticky bg-white sm:bg-transparent md:bg-transparent lg:bg-transparent 2xl:bg-transparent w-screen sm:w-20 md:w-20 lg:w-20 2xl:w-20">
      <NavBar />
      </div>


    <div className="content-container md:p-2 lg:p-2 2xl:p-2 md:m-2 lg:m-2 2xl:m-2 md:ml-3 lg:ml-3 2xl:ml-3  md:w-2/3 lg:w-2/3 2xl:w-2/3">
        <div className="heading-container">
            <p className="font-bold text-blue-500 text-2xl text-left">Home</p>
        </div>
        <div className = "blogs-container min-h-screen relative w-full">

         <BlogList blogs = {blogs}/>
         
          
          
        </div>
        <div className="flex flex-row justify-center">
       {(totalPages > currentPage) &&  <Button onClick={loadMoreBlogs}>Load More</Button>}   
        </div>
        <div className="flex flex-row justify-center">
           {loading &&   <Spinner aria-label="Medium sized spinner example" size="md" />}
        </div>
    </div>
    <div className="fixed bottom-14 sm:relative md:relative lg:relative 2xl:relative sm:top-0  sm:w-24 md:w-32 lg:w-36 2xl:w-44  sm:flex md:flex lg:flex 2xl:flex sm:flex-row md:flex-row lg:flex-row 2xl:flex-row p-2">
    <UploadModal />
    <RightBar />
    </div>

</div>

    </>
  )
}
export default Home;