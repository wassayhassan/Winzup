import React from 'react';

function BlogImage({image, imagesCount}){
  let imageStyle = 'bg-secondary p-1 rounded-md w-full border border-gray-200';
  return(

       <img src={`/api/user/photo/${image.image}`} alt="" className="h-full w-full rounded-md" />

  )
}
export default BlogImage;