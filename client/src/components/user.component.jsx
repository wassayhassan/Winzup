import React from "react";
import { Table } from "flowbite-react";
import UserEditModal from "./usereditmodal.component";

function User({user}){
   return (
    <>
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {user.firstname + " " + user.lastname}
        </Table.Cell>
        <Table.Cell>
            {user.email}
        </Table.Cell>
        <Table.Cell>
            {user.createdAt}
        </Table.Cell>
        <Table.Cell>
            {user.activeStatus === "true"? <div className="flex flex-row justify-center"><p className="text-green-600  border-green-300 border rounded-md px-2">Active</p></div>: <div className="flex flex-row justify-center"><p className="border border-red-300  text-red-500 rounded-md px-2">InActive</p></div>}
        </Table.Cell>
        <Table.Cell>
            {user.verifiedStatus === "true"? <div className="flex flex-row justify-center"> <p className="border border-green-300 text-green-600 px-2 rounded-md">Verified</p> </div>:<div className="flex flex-row justify-center"><p className="text-red-500 border border-red-300 rounded-md px-2">Not Verified</p></div>}
        </Table.Cell>
        <Table.Cell>

            <UserEditModal user={user} />
        </Table.Cell>
        </Table.Row>
    </>
   )
}
export default User;