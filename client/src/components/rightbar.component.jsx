import React from 'react';
import UserMenu from './usermenu.component';

function RightBar(){
    return(
      <div className='invisible sm:visible md:visible lg:visible 2xl:visible rightside-container p-2'>
          <div className='flex flex-row'>
            <UserMenu />
          </div>
      </div>
    )
}
export default RightBar;