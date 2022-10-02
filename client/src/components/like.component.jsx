import React from 'react';
import {AiOutlineLike} from 'react-icons/ai';
import { Button } from "@mui/material";


function Like(props){
    return(
    <div className="like hover:bg-slate-50 w-1/3 rounded-md p-1 flex flex-row justify-center bg-white ml-1 mr-1"><Button endIcon={<AiOutlineLike size='1.5em' color={(props.userLiked || props.ulike)? '#0096FF': "#000"}/>} onClick={props.likeBlog}>{(props.userLiked || props.ulike)? 'Liked': 'Like'}</Button></div>
    )
}
export default Like;