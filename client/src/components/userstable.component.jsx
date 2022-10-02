import React, { useEffect, useState } from "react";
import {Table, Spinner, Pagination, TextInput, Button} from 'flowbite-react';
import axios from "axios";
import UserTableList from "./userslist.component";
import {AiOutlineSearch} from 'react-icons/ai';
import {HiOutlineRefresh} from 'react-icons/hi';
function UsersTable(){
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]  = useState(null);
  function onPageChange(e){
    axios.post(`/api/users/get/${currentPage}`).then((response)=> {
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    })
  }
  function handleSearchChange(e){
    if(e.target.value){
      let searchval  = new RegExp(e.target.value.toLowerCase());
      let newUsers = users.filter((user)=> searchval.test(user.firstname.toLowerCase()) || searchval.test(user.lastname.toLowerCase()));
      setFilteredUsers(newUsers);
    }else{
      setFilteredUsers(users);
    }
  }
   function getUsers(){
    axios.post(`/api/users/get/${currentPage}`).then((response)=> {
      setUsers(response.data.users);
      setFilteredUsers(response.data.users);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    })
   }

  useEffect(()=> {
    setLoading(true);
    getUsers();
  },[] )
    return (
        <>
        <div className="up-con flex flex-row justify-between m-2 mb-3">
          <div>
          <TextInput
            id="search"
            type="text"
            placeholder="Search"
            required={true}
            icon={AiOutlineSearch}
            onChange={handleSearchChange}
          />
          </div>
          <div>
          <Button onClick={getUsers}>
            <HiOutlineRefresh className="mr-2 h-5 w-5" />
            Refresh
          </Button>
          </div>

        </div>
        <Table hoverable={true}>
  <Table.Head>
    <Table.HeadCell>
      User name
    </Table.HeadCell>
    <Table.HeadCell>
      Email
    </Table.HeadCell>
    <Table.HeadCell>
      Created Date
    </Table.HeadCell>
    <Table.HeadCell>
      Active Status
    </Table.HeadCell>
    <Table.HeadCell>
      Verified Status
    </Table.HeadCell>
    <Table.HeadCell>
      <span className="sr-only">
        Edit
      </span>
    </Table.HeadCell>
  </Table.Head>
  <Table.Body className="divide-y">
   <UserTableList users={filteredUsers} />
  

  </Table.Body>
</Table>
   {totalPages && totalPages > 1 &&  <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        showIcons={true}
        totalPages={totalPages}
      />}
   
    <div className='flex flex-row justify-center mt-3'>
        {loading? <Spinner/>: ''}

    </div>

        </>
    )
}
export default UsersTable