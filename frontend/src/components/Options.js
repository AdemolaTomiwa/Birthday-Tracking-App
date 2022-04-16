import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Options = () => {
   const [show, setShow] = useState(false);

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   useEffect(() => {
      if (user) {
         setShow(true);
      } else {
         setShow(false);
      }
   }, [user]);

   return (
      <div className="options">
         {show && (
            <Link to="/profile">
               <div className="option-icon">
                  <i className="fas fa-user"></i>
               </div>
            </Link>
         )}
         {/* 
         <div
            className={
               showContainer ? 'options-container-show' : 'options-container'
            }
         >
            <div onClick={logout}>Sign Out</div>
            <Link to="/profile">
               <div>Profile</div>
            </Link>
            <div className="name">
               <i className="fas fa-user"></i>{' '}
               {user ? (
                  <>
                     {user.firstName} {user.lastName}
                  </>
               ) : null}
            </div>
         </div> */}
      </div>
   );
};

export default Options;
