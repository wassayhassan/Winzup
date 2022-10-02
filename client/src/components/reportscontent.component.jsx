import React from 'react';
import ReportsTable from './reportstable.component';

function ReportsContent(){

    return (
     <div className='content-container m-2 p-2'>
        <div className='heading-container'>
          <p className='font-extrabold text-2xl text-blue-700 text-left'>Reports</p>
        </div>
        <div className='usertable-container mt-10'>
         <ReportsTable />
        </div>
     </div>
    )
}
export default ReportsContent;