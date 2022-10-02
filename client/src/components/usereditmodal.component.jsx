import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import { Button, Spinner } from 'flowbite-react';
import axios from 'axios';

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

export default function UserEditModal({user}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeStatus, setActiveStatus] = useState(user.activeStatus === 'true'? true: false);
  const [verifiedStatus, setVerifiedStatus] = useState(user.verifiedStatus === 'true'? true: false);
  const [loading, setLoading] = useState(false);

 function submitChanges(){
    setLoading(true);
    let data = {
      userid: user._id,
      activeStatus: activeStatus,
      verifiedStatus: verifiedStatus
    }
    axios.post(`/api/user/update`, data).then((response)=> {
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
         <div className='heading-container'>
            <p className='font-bold text-2xl'>User Details</p>
         </div>
         <div className='userinfo-container flex flex-row flex-wrap'>
            <div className='field-con flex flex-col m-1 p-1'>
                <label htmlFor="">Username</label>
                <input type="text" className='w-56 h-10 rounded-md' value={user.firstname + " " + user.lastname} readOnly />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Email</label>
                <input type="text"  className='w-56 h-10 rounded-md' value={user.email} readOnly />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">CreatedAt</label>
                <input type="text"  className='w-56 h-10 rounded-md' value={user.createdAt} readOnly />
            </div>
            <div className='field-con flex flex-col  m-1 p-1'>
                <label htmlFor="">Last Updated</label>
                <input type="text"  className='w-56 h-10 rounded-md' value={user.updatedAt} readOnly />
            </div>

         </div>
         <div>
         <div className='actions-container  m-1 p-1 flex flex-row'>
                <label htmlFor="" className='m-1'>Active Status</label>
              <div className='m-1 p-1'>
                <AntSwitch checked={activeStatus} inputProps={{ 'aria-label': 'ant design' }} name="activeSwitch" onChange={()=> {
                  setActiveStatus(prev=> (!prev))
                }} />
              </div>
              
            </div>
            <div className='actions-container  m-1 p-1 flex flex-row'>
                <label htmlFor="" className='m-1'>Verified Status</label>
                <div className='m-1 p-1'>
                   <AntSwitch checked={verifiedStatus} inputProps={{ 'aria-label': 'ant design' }} name="verifiedSwitch" onChange={()=> {
                    setVerifiedStatus(prev => (!prev))
                   }} />
                </div>
              
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