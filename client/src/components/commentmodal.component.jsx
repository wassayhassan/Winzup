import React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {Button} from 'flowbite-react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {AiOutlineComment} from "react-icons/ai";
import SendIcon from '@mui/icons-material/Send';
import {AiOutlineSend} from 'react-icons/ai';
import axios from 'axios';
import {useSelector} from 'react-redux'
import CommentList from './commentlist.component';
import {Spinner, Textarea} from 'flowbite-react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '0.5em',
  boxShadow: 24,
  p: 4,
};

export default function CommentModal({blogid}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [comments, setComments] = useState([]);
  const[loadingComment, setLoadingComment] = useState(true);
  const [commentLoadingError, setCommentLoadingError] = useState(false);
  const{userData} = useSelector((state)=> state.auth)

  //comment input start
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  //comment input end

  async function submitComment(){
    let data = {
      authorid: userData._id,
      blogid: blogid,
      comment: value,
    }
    axios.post('/api/blog/createcomment', data).then((res)=> {
      console.log(res.data);
      getComments();
    })
  }
  function getComments(){
    axios.post(`/api/blog/comments/${blogid}`).then((response)=> {
      setComments(response.data);
      setLoadingComment(false);
 }).catch((err)=> {
    commentLoadingError(true);
 })
  }
  useEffect(()=> {
    if(open){
      setLoadingComment(true);
      getComments();
    }

  }, [open])



  return (
    <div>
      <div>
      <Button color="#fff" onClick={handleOpen} size="1.2em" > <AiOutlineComment  size='1.5em' color="#000" /> <p className='text-black'>Comment</p></Button>
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Comments</p>
          <div className='comment-container'>
            <p className='text-center'>{loadingComment && <Spinner />}</p>
            <p className='text-red-400'>{commentLoadingError && "An Error Occurred"}</p>
            <CommentList comments = {comments} />
          </div>

          <div>
          <div className="sendtext-container p-1 relative">
              <Textarea
                  id="msgarea"
                  placeholder="Type Something..."
                  required={true}
                  rows={1}
                  onChange={handleChange}
                  value={value}
              />
              <div className="absolute right-2 top-2">
                <SendIcon onClick={submitComment} />
        
              </div>
            
              </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}