import React from "react";
import NavBar from "../components/navbar.component";
import  {useState, useEffect} from 'react';
import PeopleList from "../components/peoplelist.coponent"
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../slices/userSlice";
import {AiOutlineSearch} from 'react-icons/ai';
import {TextInput,Tabs, Spinner} from 'flowbite-react';
import BlogList from "../components/blogList.component";



function Search(){

const {userData} = useSelector(state=> state.auth);

const [search, setSearch] = useState('');
const [users, setUsers] = useState([]);
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(false);


function handleChange(e){
  setSearch(e.target.value);

}

function handleSubmit(e){
  e.preventDefault();
  setLoading(true);
  axios.post(`/api/users/getbyname/${search}`).then((res)=> {
    setUsers(res.data);
    setLoading(false);
  });
  searchPosts();

}
function searchPosts(){
  setLoading(true);
  axios.post(`/api/blogs/search/searchkey`, {searchkey: search}).then((res)=> {
    console.log(res)
  setPosts(res.data);
  setLoading(false);
  })
}


  return (

    <div className="container bg-primary min-h-screen flex flex-row">
      <div className="fixed w-screen bottom-0 z-10 md:z-0 lg:z-0 2xl:z-0 sm:sticky md:sticky lg:sticky bg-white sm:bg-transparent md:bg-transparent lg:bg-transparent 2xl:bg-transparent sm:w-20 md:w-20 lg:w-20 2xl:w-20">
         <NavBar />
      </div>

        <div className="content-container p-2 m-2 ml-3 w-full">
            <div className="heading-container">
                <p className="font-bold text-blue-500 text-2xl text-left ml-3">Search</p>
            </div>
            <div className="searchinput-container w-full m-3">
              <form onSubmit={handleSubmit} className="w-full">
              <div className="w-3/5">
                <TextInput
                  id="search"
                  type="text"
                  placeholder="Search"
                  required={true}
                  icon={AiOutlineSearch}
                  onChange={handleChange}
                />
                </div>
              </form>
            </div>
            <Tabs.Group
                aria-label="Tabs with underline"
                style="underline"
              >
                <Tabs.Item title="People" active={true}>
                  {loading && <Spinner
                      aria-label="Small spinner example"
                      size="md"
                    />
                   } 
                <div className="searchresults-container w-3/5">
                   <PeopleList  users = {users} logginid={userData._id} logginfriends={userData.friends} />
                 </div>
                </Tabs.Item>
                <Tabs.Item title="Posts" active={true}>
                  {/* {searchPosts()} */}
                  {loading && <Spinner
                      aria-label="Small spinner example"
                      size="md"
                    />
                   } 
                   <div className="w-3/5 h-3/5">
                     <BlogList blogs = {posts} />
                   </div>
                </Tabs.Item>

              </Tabs.Group>
              

        </div>
        
    </div>
  )
}
export default Search;