import * as React from 'react';
import Box from '@mui/material/Box';
import {Button} from 'flowbite-react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {AiOutlineMessage} from 'react-icons/ai'
import FriendList from './friendlist.component';
import { getUserData } from '../slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import {useState, useEffect} from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#fff',
  border: '1px solid #000',
  borderRadius: '1em',
  boxShadow: 24,
  p: 4,
};

export default function NewMessage() {
  const dispatch  = useDispatch();
  const {userData} = useSelector((state)=> state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [search, setSearch] = useState('');
 
  useEffect(()=> {
    dispatch(getUserData());
  }, [])
function handleSearchChange(e){
   setSearch(e.target.value);
}



  return (
    <div>
        <Button onClick={handleOpen}>
          <p className='mx-1 text-base'> New Message</p>
          <AiOutlineMessage size="1.7em" />
        </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
             <p className='font-semibold text-2xl'>Friend List</p>
          </div>
          <FriendList userData = {userData} />
          
        </Box>
      </Modal>
    </div>
  );
}