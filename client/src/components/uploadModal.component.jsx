import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from 'react';
import { getAll } from "../slices/blogSlice";
import {  useDispatch } from "react-redux";
import { upload } from '../slices/blogSlice';
import { Textarea, Button } from "flowbite-react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  outline: 0,
  borderRadius: '1em',
  p: 4,
};

export default function UploadModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  const [blogVals, setblogVals] = useState({
    title: '',
    category: '',
    blog: '',
    image: ''
  });
  const [images, setImages] = useState([]);

  function handleChange(e){
     let name = e.target.name;
     let value = e.target.value;
     setblogVals({...blogVals, [name]: value});
  }
  async function submitForm(){
    let data = new FormData();
    data.append('blog', blogVals.blog);
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }
    // data.append('images', images);
    
    dispatch(upload(data));
    setTimeout(()=> {
      dispatch(getAll());
    }, 750);
   
    
   
    
  }


  return (
    <div>
      <Button variant="contained" sx={{margin: 2}} onClick={handleOpen}>
      <AiOutlinePlus size="1.9em"/>
       New Post    
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           <form action="" method="post" className='flex flex-col'>
            <div className="inputfield flex flex-col p-2">
            <Textarea
            id="msgarea"
            placeholder="Type Something..."
            required={true}
            rows={4}
            name='blog' 
            onChange={handleChange}
        />
            </div>
            <div className='inputfield flex flex-col p-2'>
                <label htmlFor="" className='font-bold text-lg'>Add Image</label>
                <input type="file" name="images" multiple onChange={(e)=> {
                  for(let i = 0; i < e.target.files.length; i++){
                    let fil = e.target.files[i];
                  
                  setImages((prevState)=> [...prevState, fil]);
                  }
                
                  }
                  }  className="border-2 rounded-md p-2 border-gray-500" />
            </div>

            <div className='upload-container p-2 flex flex-row justify-end'>
              <div className='m-1'>
                 <Button color="failure" onClick={()=> setOpen(false)}>Close</Button>
              </div>
              <div className='m-1'>
                <Button onClick={submitForm}>Upload</Button>
              </div>
            </div>
           
            
           </form>
        </Box>
      </Modal>
    </div>
  );
}
