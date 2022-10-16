import React from 'react';
import BlogImage from './blogimage.component';
import {Carousel} from 'flowbite-react';
import {AiOutlineRight, AiOutlineLeft} from 'react-icons/ai';

function BlogImages({images}){
    if(images.length < 1){
        return 
    }else{
        return(
            <div className="h-full sm:h-64 xl:h-80 2xl:h-96 w-full">
             <Carousel slide={false} indicators={false} leftControl={images.length > 1?<AiOutlineLeft size="1.3em" />: null} rightControl={images.length > 1?<AiOutlineRight size="1.3em" />: null}>
    
                    {
                            images && images.map((img)=> {
                                return <BlogImage image={img} key={img._id} />
                            })
                    }
              </Carousel>
         </div>
           
        )
    }
   


}
export default BlogImages;