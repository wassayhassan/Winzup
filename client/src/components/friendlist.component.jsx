import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Friend from './friend.component';
import axios from 'axios';

function FriendList({userData}){
//  console.log(userData);

   const [conversationz, setConversationz] = useState([]);

   useEffect(()=> {
      axios.post(`/api/chat/conversations/${userData._id}`).then((response)=> {
         setConversationz(response.data);
        })
   }, [userData]);

   return (
      userData.friends && userData.friends.map((friend)=> {
       return <Friend friendid = {friend.friend} conversations = {conversationz} key={friend.friend}  />
      })
   )
}
export default FriendList;