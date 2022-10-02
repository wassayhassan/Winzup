import React from 'react';
import ReportModal from './reportmodel.component';
import { Dropdown } from 'flowbite-react';

export default function FadeMenu({postId}) {

      return(
       <div className='m-2'>

       <Dropdown
       label=""
       inline={true}
     >
       <Dropdown.Item>
         <ReportModal postId={postId} />
       </Dropdown.Item>
     </Dropdown>
     </div>
  );
}