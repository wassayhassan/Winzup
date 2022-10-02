import React from 'react';
import ShareFriend from './shareFriend.component';
import { ListGroup } from 'flowbite-react';

function ShareFriendList({friends, shareList, setShareList }){
    return (
        <ListGroup>

        
        {friends && friends.map((friend)=> {
           return <ShareFriend friend={friend} key={friend._id} shareList={shareList} setShareList={setShareList} />
        })}
        </ListGroup>

    )
}
export default ShareFriendList;