import React from "react";
import { Table } from "flowbite-react";

function HomeUser({user}){
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
        </Table.Row>
    </>
   )
}
export default HomeUser;