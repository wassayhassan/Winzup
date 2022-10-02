import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useState, useEffect, useRef } from 'react';
import { Button, Spinner, Textarea, Select, Label, Modal } from 'flowbite-react';
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

export default function ReportEditModal({report}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [resolveStatus, setResolveStatus] = useState(report.solved === 'true'? true: false);
  const [resolveStage, setResolveStage] = useState(null);
//   const [verifiedStatus, setVerifiedStatus] = useState(user.verifiedStatus === 'true'? true: false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});

  useEffect(()=> {
     axios.get(`/api/blog/${report.postId}`).then(res=> {
          setPost(res.data);
          console.log(res.data)
     })
    
  }, [])
  function selectChangeHandler(e){
    setResolveStage(e.target.value)
  }

 function submitChanges(){
    setLoading(true);
    let data = {resolveStatus};
    if(resolveStage){
      data.resolveStage = resolveStage
    }

    axios.patch(`/api/report/${report._id}`, data).then((response)=> {
      console.log(response);
      setLoading(false);
    })
 }

  return (
    <>
      <button onClick={handleOpen} className="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</button>

<Modal
  show={open}
  size="2xl"
  popup={true}
  onClose={handleClose}
>
  <Modal.Header />
  <Modal.Body>
  <div className='h-96 overflow-y-scroll sm:w-full md:w-full lg:w-full 2xl:w-full'>
       <div className='heading-container'>
          <p className='font-bold text-2xl'>Report Details</p>
       </div>
       <div className='userinfo-container flex flex-row flex-wrap'>
          <div className='field-con flex flex-col m-1 p-1'>
              <label htmlFor="">Report Id</label>
              <input type="text" className='w-56 h-10 rounded-md' value={report._id} readOnly />
          </div>
          <div className='field-con flex flex-col  m-1 p-1'>
              <label htmlFor="">Reported By</label>
              <input type="text"  className='w-56 h-10 rounded-md' value={report.userId} readOnly />
          </div>
          <div className='field-con flex flex-col  m-1 p-1'>
              <label htmlFor="">Reported Post Id</label>
              <input type="text"  className='w-56 h-10 rounded-md' value={report.postId} readOnly />
          </div>
          <div className='field-con flex flex-col  m-1 p-1'>
              <label htmlFor="">CreatedAt</label>
              <input type="text"  className='w-56 h-10 rounded-md' value={report.createdAt} readOnly />
          </div>
          <div className='field-con flex flex-col  m-1 p-1'>
              <label htmlFor="">Last Updated</label>
              <input type="text"  className='w-56 h-10 rounded-md' value={report.updatedAt} readOnly />
          </div>


       </div>
       <div className='field-con flex flex-col  m-1 p-1'>
              <label htmlFor="">Post Data</label>
              <Textarea type="text" rows="4" value={post && post.blogData} readOnly />
          </div>
       <div>
       <div className='actions-container  m-1 p-1 flex flex-row'>
              <label htmlFor="" className='m-1'>Resolve Status</label>
            <div className='m-1 p-1'>
              <AntSwitch checked={resolveStatus} inputProps={{ 'aria-label': 'ant design' }} name="activeSwitch" onChange={()=> {
                setResolveStatus(prev=> (!prev))
              }} />
            </div>
            
          </div>
          <div className='actions-container  m-1 p-1 flex flex-row'>
            <div className='flex flex-col justify-center'>
            <label htmlFor="" className='m-1'>Resolve Stage</label>
            </div>
              <div id="select w-36">
                  <div className="mb-2 block">
                  </div>
                  <Select
                    id="resolvestage"
                    required={false}
                    onChange={selectChangeHandler}
                    value={report.solveStage}
                  >
                    <option selected={false}>
                      Under Review
                    </option>
                    <option selected={false}>
                      Resolved
                    </option>
                    <option>
                      Unresolved
                    </option>
                  </Select>
                </div>
            
          </div>
          <div className='flex flex-row justify-end'>
            <div className='m-2'>
              <Button color='failure' onClick={handleClose}>Close</Button>
            </div>
            <div className='m-2'>
            <Button onClick={submitChanges}>
               {loading? <Spinner aria-label="Spinner button example" />: '' } 
                <span className="pl-3">
                  {loading? 'Saving...': 'Save'}
                </span>
              </Button>
            </div>


              </div>
       </div>
       </div>
  </Modal.Body>
</Modal>
    </>
    
  );
}