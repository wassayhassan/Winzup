import React from 'react';
import {AiOutlineLike} from 'react-icons/ai';
import { Button } from "flowbite-react";


function Like(props){
    return(
    <div className="like hover:bg-slate-50 w-1/3 rounded-md p-1 flex flex-row justify-center items-center bg-white ml-1 mr-1 cursor-pointer"><Button onClick={props.likeBlog} color="#fff" size="1.2em"> <AiOutlineLike size='1.5em' color={(props.userLiked || props.ulike)? '#0096FF': "#000"}/> {(props.userLiked || props.ulike)? 'Liked': 'Like'}</Button></div>
    )
}
export default Like;