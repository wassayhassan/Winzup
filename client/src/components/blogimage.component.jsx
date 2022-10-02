import React from 'react';

function BlogImage({image, imagesCount}){
  let imageStyle = imagesCount >= 2? 'bg-secondary p-1 rounded-md w-1/2 border border-gray-200' : 'bg-secondary p-1 rounded-md w-full border border-gray-200';
  return(
    <div className={imageStyle}>
       <img src={`/api/user/photo/${image.image}`} alt="" className="h-64 w-full rounded-md" />
    </div>
  )
}
export default BlogImage;