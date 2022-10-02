import React from 'react';
import UsersTable from './userstable.component';

function DashUsersContent(){

    return (
     <div className='content-container m-2 p-2'>
        <div className='heading-container'>
          <p className='font-extrabold text-2xl text-blue-700 text-left'>Users</p>
        </div>
        <div className='usertable-container mt-10'>
         <UsersTable />
        </div>
     </div>
    )
}
export default DashUsersContent;