import React from "react";
import PostsTable from "./poststable.component";

function DashPostsContent(){
    return (
        <div>
          <div className="header m-2 p-2">
             <p className="font-extrabold text-2xl text-blue-700 text-left">Posts</p>
          </div>
          <div className="content-container m-2 p-2">
            <PostsTable />
          </div>
        </div>
    )
}
export default DashPostsContent