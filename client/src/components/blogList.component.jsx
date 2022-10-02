import React, { useEffect } from "react";
import BlogCard from "./blogCard.component";

function BlogList({blogs}){
  return (
        blogs && blogs.map((iblog)=> {
          return <BlogCard blog={iblog} key={iblog._id} />
        })
     )
}
export default BlogList;