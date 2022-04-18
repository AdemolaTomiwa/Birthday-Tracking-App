import React from 'react';
import { useSelector } from 'react-redux';

const Wish = ({ name }) => {
   const userState = useSelector((state) => state.user);
   const { user } = userState;

   return (
      <>
         {name === user.firstName ? (
            <div className="wish-message">
               Hurray! Today is your{' '}
               <span className="highlight">Birthday!!!</span>
            </div>
         ) : (
            <div className="wish-message">
               Today is <span className="highlight">{`${name}'s`}</span>{' '}
               Birthday!!!
            </div>
         )}
      </>
   );
};

export default Wish;
