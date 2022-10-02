import  React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {useState} from "react"
import { updateProfile, getUserData } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux/es/exports';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#fff',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditProfileModal() {
  const {userData} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [profilePic, setProfilePic] = useState('');
  const [headerpic, setHeaderpic] = useState('');
  const [userVals, setUserVals] = useState({
    firstname: userData.firstname,
    lastname: userData.lastname,
    location: userData.location
  });
  function handleUChange(e){
   let name = e.target.name;
   let value= e.target.value;
   console.log(name);
   console.log(value);

   setUserVals({...userVals, [name]: value});
  }
  function handleSubmit(){
    let data = new FormData();
    console.log(profilePic);
    data.append("profilepic",profilePic);
    data.append('headerpic',headerpic)
    data.append('firstname', userVals.firstname);
    data.append('lastname', userVals.lastname);
    data.append('location', userVals.location);
    dispatch(updateProfile(data));
    setTimeout(()=> {
       dispatch(getUserData());
    }, 750)

  }

  let headerstyle= userData.headerpic !== undefined? {backgroundImage: `url(/api/user/photo/${userData.headerpic})`} : '';

  let profilestyle= userData.profilepic !== undefined? {backgroundImage: `url(/api/user/photo/${userData.profilepic})`} : '';




  return (
    <div>
    <Button variant="outlined" onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className='modalheading-container'>
            <p className="text-blue-500 font-semibold">Edit Profile</p>
           
        </div>
        <div className='headerpic-container'>
          <p className="">Header Pic</p>
           
            <div className="flex justify-center items-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-36 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" onChange={(e)=>{
                  let current = e.target.files[0];
                  setHeaderpic(current);
                }}  
                style={headerstyle}

                >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <AddAPhotoIcon/>
                    
                    </div>
                    <input id="dropzone-file" type="file" className="hidden"/>
                </label>
            </div>          
        </div>
        <div className='profilepic-container'>
        <p>Profile Pic</p>
            <img src="" alt="" />
            <div className="flex m-2 w-full">
                <label htmlFor="dropzone-profileimage" className="flex flex-col justify-center items-center w-32 h-32 bg-gray-50 rounded-full border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 text-left" onChange={(e)=> {
                  let current = e.target.files[0]; 
                  setProfilePic(current);
                  console.log(current);
                }}
                style={profilestyle}
                >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <AddAPhotoIcon/>
                  
                    </div>
                    <input id="dropzone-profileimage" type="file" className="hidden"/>
                </label>
            </div>        
      </div>
      <div className='personalinfo-container'>
        <div className='username-container flex flex-row flex-wrap'>
          <div className='userfirst m-1 p-1 flex flex-col'>
            <label htmlFor="" >First Name</label>
            <input type ="text" value={userData.firstname} name="firstname" className='p-2 rounded-md outline-none w-56' onChange={handleUChange}/>
          </div>
          <div className='userlast m-1 p-1 flex flex-col'>
          <label htmlFor="" >Last Name</label>
            <input type ="text" value={userData.lastname}  name="lastname" className='p-2 rounded-md outline-none w-56' onChange={handleUChange}/>
          </div>
          <div className='userlast m-1 p-1 flex flex-col'>
          <label htmlFor="">Location</label>
            <input type ="text" value={userData.location} name="location" className='p-2 rounded-md outline-none w-56' onChange={handleUChange}/>
          </div>
        </div>
      </div>

        <div className='factions-container flex flex-row justify-end'>
        <div className='m-1'>
          <Button variant="contained" endIcon={<CancelIcon />} onClick={handleClose}>
                Cancel
            </Button>
          </div>
          <div className='m-1'>
          <Button variant="contained" endIcon={<SaveIcon />} onClick={handleSubmit}>
                Save
            </Button>
          </div>



        </div>
          

        </Box>
      </Modal>
    </div>
  );
}
