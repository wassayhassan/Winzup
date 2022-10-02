import React from "react";
import { Table } from "flowbite-react";
import ReportEditModal from "./reporteditmodal.component";

function Report({report}){
   return (
    <>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {report._id}
        </Table.Cell>
        <Table.Cell>
            {report.postId}
        </Table.Cell>
        <Table.Cell>
            {report.createdAt}
        </Table.Cell>
        <Table.Cell>
            {report.solved === "true"? <div className="flex flex-row justify-center"><p className="text-green-600  border-green-300 border rounded-md px-2">Resolved</p></div>: <div className="flex flex-row justify-center"><p className="border border-red-300  text-red-500 rounded-md px-2">Not Resolved</p></div>}
        </Table.Cell>
        <Table.Cell>
            {report.userId}
            {/* {user.verifiedStatus === "true"? <div className="flex flex-row justify-center"> <p className="border border-green-300 text-green-600 px-2 rounded-md">Verified</p> </div>:<div className="flex flex-row justify-center"><p className="text-red-500 border border-red-300 rounded-md px-2">Not Verified</p></div>} */}
        </Table.Cell>
        <Table.Cell>

            <ReportEditModal report={report} />
        </Table.Cell>
        </Table.Row>
    </>
   )
}
export default Report;