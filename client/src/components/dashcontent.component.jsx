import React from 'react';
import DashWidgets from './widgets.components';
import HomeUsersTable from './dashhomeuserstable.component';

function DashContent(){
    return (
     <div className='content-container p-2'>
        <div className='heading-container'>
          <p className='font-extrabold text-2xl text-blue-700 text-left'>DashBoard</p>
        </div>
        <div className='widgets-container m-2 ml-4 mt-5'>
         <DashWidgets />
        </div>
        <div className='shorttables-con'>
             <div className='users-shorttable'>
               <HomeUsersTable />
             </div>
        </div>
     </div>
    )
}
export default DashContent;