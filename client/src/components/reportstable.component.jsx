import React, { useEffect, useState } from "react";
import {Table, Spinner, Pagination, TextInput, Button} from 'flowbite-react';
import axios from "axios";
import ReportsTableList from "./reportstablelist.component";
import {AiOutlineSearch} from 'react-icons/ai';
import {HiOutlineRefresh} from 'react-icons/hi';
function ReportsTable(){
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]  = useState(null);
  function onPageChange(e){
    axios.get(`/api/reports/get/${currentPage}`).then((response)=> {
        console.log(response)
      setReports(response.data.reports);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    }).catch(err=> {
        console.log(err);
    })
  }

   function getReports(){
    axios.get(`/api/reports/get/${currentPage}`).then((response)=> {
        console.log(response);
      setReports(response.data.reports);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    })
   }

  useEffect(()=> {
    setLoading(true);
    getReports();
  },[] )
    return (
        <>
        <div className="up-con flex flex-row justify-between m-2 mb-3">

        </div>
        <Table hoverable={true}>
        <Table.Head>
            <Table.HeadCell>
            Report Id
            </Table.HeadCell>
            <Table.HeadCell>
            Post Id
            </Table.HeadCell>
            <Table.HeadCell>
            Created Date
            </Table.HeadCell>
            <Table.HeadCell>
            Resolve Status
            </Table.HeadCell>
            <Table.HeadCell>
            Reporter Id
            </Table.HeadCell>
            <Table.HeadCell>
            <span className="sr-only">
                Edit
            </span>
            </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
        <ReportsTableList reports={reports} />
        

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
export default ReportsTable