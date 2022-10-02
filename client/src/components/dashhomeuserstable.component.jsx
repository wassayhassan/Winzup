import React, { useEffect, useState } from "react";
import {Table} from 'flowbite-react';
import axios from "axios";
import HomeUserTableList from "./homeusertablelist.component";


function HomeUsersTable(){
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);



   function getUsers(){
    axios.post(`/api/users/get/${currentPage}`).then((response)=> {
      setUsers(response.data.users);
    })
   }

  useEffect(()=> {
    getUsers();
  },[] )
    return (
        <>
        <div className="up-con flex flex-row justify-between m-2 mb-3">



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
  </Table.Head>
  <Table.Body className="divide-y">
   <HomeUserTableList users={users} />
  

  </Table.Body>
</Table>


        </>
    )
}
export default HomeUsersTable