import React from "react";
import DashPost from "./dashpost.component";

function DashPostsList({posts}){
   
   return(
      posts && posts.map((post)=> {
        return <DashPost post = {post} key={post._id} />
      })
   )
}
export default DashPostsList;