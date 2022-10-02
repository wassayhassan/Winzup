import React, { useEffect, useState } from 'react';
import { Table, Spinner, Pagination, TextInput, Button } from 'flowbite-react';
import axios from 'axios';
import DashPostsList from './dashpostslist.component';
import {AiOutlineSearch} from 'react-icons/ai';
import {HiOutlineRefresh} from 'react-icons/hi';

function PostsTable(){
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  function onPageChange(e){
    console.log(e);
    axios.post(`/api/blogs/get/${e}`).then((response)=> {
        console.log(response.data);
        setPosts(response.data.blogs);
        setFilteredPosts(response.data.blogs);
        setTotalPages(response.data.pages);
        setCurrentPage(response.data.currentpage);
        setLoading(false);
      })
  }
  function handleSearchChange(e){
    if(e.target.value){
      let searchval  = new RegExp(e.target.value.toLowerCase());
      let newpost = posts.filter((post)=> searchval.test(post.blogData.toLowerCase()));
      setFilteredPosts(newpost);
    }else{
      setFilteredPosts(posts);
    }
  }

    useEffect(()=> {
        setLoading(true);
      axios.post(`/api/blogs/get/${currentPage}`).then((response)=> {
        console.log(response.data);
        setPosts(response.data.blogs);
        setFilteredPosts(response.data.blogs)
        setTotalPages(response.data.pages);
        setCurrentPage(response.data.currentpage);
        setLoading(false);
      })
    }, [])
   return(
    <div>
              <div className="up-con flex flex-row justify-between m-2 mb-3">
          <div>
          <TextInput
            id="search"
            type="text"
            placeholder="Search"
            required={true}
            icon={AiOutlineSearch}
            onChange = {handleSearchChange}
          />
          </div>
          <div>
          <Button>
            <HiOutlineRefresh className="mr-2 h-5 w-5" />
            Refresh
          </Button>
          </div>

        </div>
        <Table hoverable={true}>
  <Table.Head>
    <Table.HeadCell>
      Post Id
    </Table.HeadCell>
    <Table.HeadCell>
      Author ID
    </Table.HeadCell>
    <Table.HeadCell>
      CReated At
    </Table.HeadCell>
    <Table.HeadCell>
      Likes
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Edit
      </span>
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">

     <DashPostsList posts = {filteredPosts}/>
  </Table.Body>
</Table>
{totalPages && totalPages > 1 && <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        showIcons={true}
        totalPages={totalPages}
      />}

<div className='flex flex-row justify-center mt-3'>
    {loading? <Spinner/>: ''}

    </div>
    </div>
   )   
}
export default PostsTable;