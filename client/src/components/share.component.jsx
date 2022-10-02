import React from "react";
import {Modal, Button, TextInput} from 'flowbite-react';
import {AiOutlineShareAlt} from 'react-icons/ai';
import { useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import axios from 'axios';
import ShareFriendList from './sharefriendlist.component';
import SendIcon from '@mui/icons-material/Send';
function SharePost({postId}){
    console.log(postId);

  const { userData} = useSelector(state=> state.auth);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [friends, setFriends] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [shareList, setShareList] = useState([]);
  
  function handleOpen(){
    console.log('clicked')
    setOpen(true);
  }
  function handleClose(){
    setOpen(false);
  }
  useEffect(()=> {
    if(open){
        axios.get(`/api/user/${userData._id}/friends`).then((response)=> {
            console.log(response.data);
            setFriends(response.data);
            setFilteredUsers(response.data);
        })
    }

  }, [open])

  function handleSearchChange(e){
    const searchVal = new RegExp(`${e.target.value}`, 'i')
    setSearch(searchVal);
    let fil = friends.filter(friend=> searchVal.test(friend.firstname+' '+ friend.lastname))
    console.log(fil);
    setFilteredUsers(fil)
  }
  function submitShare(){
    console.log(shareList);
    axios.post('/api/notification/share/create', {receivers: shareList, postId: postId, senderId: userData._id, sendername: userData.firstname + ' '+ userData.lastname}).then(response=> {
        console.log(response);
        handleClose();
    })
  }

    return (
        <>     
           <div className="share flex flex-row justify-center items-center w-1/3 hover:bg-slate-50 rounded-md p-1 bg-white ml-1 mr-1 cursor-pointer" onClick={()=> handleOpen()}>
            <AiOutlineShareAlt  size='1.5em' color="#000"/>
            <p className="text-black font-semibold mx-2">SHARE</p>
            </div>

            <Modal
                show={open}
                onClose={()=> handleClose()}
            >
                <Modal.Header>
                Share With Your Friends
                </Modal.Header>
                <Modal.Body>

                    <div className="search-container">
                    <TextInput
                        id="small"
                        type="text"
                        sizing="sm"
                        onChange={(e)=> handleSearchChange(e)}
                        />
                    </div>
                    <div className="mt-2 overflow-y-scroll">
                        <ShareFriendList friends={filteredUsers} shareList={shareList} setShareList={setShareList} />
                    </div>
                     
                </Modal.Body>
                <div className="flex flex-row justify-end">
                    <div className="m-2">
                    <Button onClick={()=> handleClose()} color="failure" size="lg">
                         <p>Close</p>
                    </Button>
                    </div>
                    <div className="m-2">    
                        <Button
                            onClick={()=> submitShare()}  >
                                <SendIcon />
                           <p className="m-1">Share</p> 
                        </Button>


                    </div>

            
                </div>
            </Modal>
        </>
    )
}
export default SharePost;