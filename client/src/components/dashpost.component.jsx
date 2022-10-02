import React from "react";
import {Table} from 'flowbite-react';
import DashPostEdit from "./dashpostedit.component";

function DashPost({post}){
    return(
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {post._id}
      </Table.Cell>
      <Table.Cell>
        {post.authorid}
      </Table.Cell>
      <Table.Cell>
        {post.createdAt}
      </Table.Cell>
      <Table.Cell>
        {post.likes.length}
      </Table.Cell>
      <Table.Cell>
        <DashPostEdit post={post} />
      </Table.Cell>
    </Table.Row>
    )
}
export default DashPost;