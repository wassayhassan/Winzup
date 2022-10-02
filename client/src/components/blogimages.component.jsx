import React from 'react';
import BlogImage from './blogimage.component';

function BlogImages({images}){
    return(
        images && images.map((img)=> {
            return <BlogImage image={img} key={img._id} imagesCount={images.length} />
        })
    )

}
export default BlogImages;