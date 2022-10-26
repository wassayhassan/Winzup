import React, { useEffect } from "react";
import BlogCard from "./blogCard.component";
import { Bounce, Zoom } from "react-awesome-reveal";


function BlogList({blogs}){
  return (
    <Zoom triggerOnce={true}>{
          blogs && blogs.map((iblog)=> {
            return <BlogCard blog={iblog} key={iblog._id} />
          })  
        }
     </Zoom>

     )
}
export default BlogList;