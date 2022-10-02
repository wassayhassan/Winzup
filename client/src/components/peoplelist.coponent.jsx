import React from 'react';

import People from "./people.component";
function PeopleList({users, logginid, logginfriends}){
  
     return (
        <div className='people-con'>
          {users && users.map((user)=> {
            if(user._id === logginid){
              return 
            }else{
              return(
                <People user={user} logginfriends={logginfriends} key={user._id} />
                )
            }
            
          })}  
        </div>
     )
}
export default PeopleList;