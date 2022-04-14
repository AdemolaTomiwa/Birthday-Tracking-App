import React from 'react';

const Birthday = () => {
   return (
      <div className="birthday">
         <div className="img">
            <img
               src="https://images.pexels.com/photos/1974197/pexels-photo-1974197.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
               alt=""
            />
         </div>
         <div className="name">
            <h4>
               Jimmy <span>Inyene</span>
            </h4>
            <p>29 Days 14 Hours remaining</p>
         </div>
         <div className="date">
            <h4>10</h4>
            <h4>May</h4>
         </div>
      </div>
   );
};

export default Birthday;
