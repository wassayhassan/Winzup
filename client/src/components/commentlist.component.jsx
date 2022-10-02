import React from 'react';
import Comment from './comment.component';

function CommentList({comments}){
   return(
    <>
    {comments && comments.map((comment)=> {
        return <Comment comment = {comment} key={comment._id}/>
    })}
    </>
   )
}
export default CommentList;