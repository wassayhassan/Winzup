import React, {useState} from 'react';
import {Button, Textarea, Modal} from 'flowbite-react';
import axios from 'axios';
import {useSelector} from 'react-redux'
function ReportModal({postId, closeDots}){
    const {userData} = useSelector(state=> state.auth)

  const [open, setOpen] = useState(false);
  const [reportText, setReportText] = useState('');

  function handleOpen(){
    setOpen(true);
    
  }
  function handleClose(){
    setOpen(false);
  }
  function handleSubmit(){
    axios.post('/api/report/create', {    userId: userData._id,
        postId: postId,
        message : reportText,
        solveStage: 'Sent to Admin',
        solved:'false'}).then((response)=> {
            console.log(response.data);
            handleClose();
        })

  }
  function handleTextChange(e){
    console.log(e.target.value);
    setReportText(e.target.value)
  }
  return (
    <>
 <p onClick={()=> handleOpen()}>Report</p>
  <Modal
    show={open}
    onClose={()=> handleClose()}
  >
    <Modal.Header>
      Report a Post
    </Modal.Header>
    <Modal.Body>
        <div>
            <div>
                <p>Enter a message</p>
            </div>
            <div>
            <Textarea
                    id="comment"
                    placeholder="Leave a message for the admin"
                    required={false}
                    rows={4}
                    onChange={handleTextChange}
                />
            </div>
        </div>

    </Modal.Body>
    <div className='flex flex-row justify-end'>
        <div className='m-2'>
        <Button onClick={()=> handleClose()} color="failure">
            Close
        </Button>
        </div>
        <div className='m-2'>
        <Button
        onClick={()=> handleSubmit()} >
            Submit Report
            </Button>
        </div>


    </div>
  </Modal>
</>
  )
}
export default ReportModal;