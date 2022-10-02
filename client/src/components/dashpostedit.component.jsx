import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Textarea} from 'flowbite-react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'flowbite-react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  borderRadius: '1.2em',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));






export default function DashPostEdit({post}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading]  = useState(false);
  const [activeStatus, setActiveStatus] = useState(post.activeStatus === 'true'? true: false);
  // const activeStatus = useRef(post.activeStatus === 'true'? true: false)


  function handleStatusChange(e){
      
    console.log(activeStatus);
    setActiveStatus((prev)=> !prev);

  }
  function submitChanges(){
     setLoading(true)
     let data = {
      postid: post._id,
      activeStatus: activeStatus,
    } 
    axios.post('/api/blog/statuschange', data).then((response)=> {
      console.log(response);
      setLoading(false);
    })

  }



  return (
    <div>
      <button onClick={handleOpen} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Post Details
          </Typography>
           <div className='content'>
             <div className='flex flex-row flex-wrap'>
                <div className='field flex flex-col m-1 p-1'>
                  <label htmlFor="" className='font-semibold'>Author Name</label>
                  <input type="text" className='w-60 h-10 rounded-md' value={post.authorfirstname + " " + post.authorlastname} readOnly/>
                </div>
                <div className='field flex flex-col  m-1 p-1'>
                  <label htmlFor=""  className='font-semibold'>Author Id</label>
                  <input type="text" className='w-60 h-10 rounded-md' value={post.authorid}  readOnly/>
                </div>
                <div className='field flex flex-col m-1 p-1'>
                  <label htmlFor=""  className='font-semibold'>Post Id</label>
                  <input type="text" className='w-60 h-10 rounded-md' value={post._id} readOnly />
                </div>
                <div className='field flex flex-col m-1 p-1'>
                  <label htmlFor=""  className='font-semibold'>Created Date</label>
                  <input type="text"  className='w-60 h-10 rounded-md' value={post.createdAt} readOnly />
                </div>
                <div className='field flex flex-row m-1  p-1 mt-8'>
                  <div className='flex flex-col justify-center mr-5'>
                     <label htmlFor=""  className='font-semibold'>Active Status</label>
                  </div>
                  <div className='flex flex-col justify-center'>
                    <AntSwitch checked={activeStatus} inputProps={{ 'aria-label': 'ant design' }} onChange={handleStatusChange} />
                  </div>

                
                </div>

               
             </div>
             <div className='field flex flex-col m-1 p-1'>
                  <label htmlFor=""  className='font-semibold'>Post</label>
                  <Textarea
                        id="comment"
                        placeholder="Leave a comment..."
                        required={true}
                        rows={4}
                        value={post.blogData}
                        readOnly
                    />
                </div>
                <div>
                <Button onClick={submitChanges}>
                 {loading? <Spinner aria-label="Spinner button example" />: '' } 
                  <span className="pl-3">
                    {loading? 'Saving...': 'Save'}
                  </span>
                </Button>
                </div>
           </div>
        </Box>
      </Modal>
    </div>
  );
}