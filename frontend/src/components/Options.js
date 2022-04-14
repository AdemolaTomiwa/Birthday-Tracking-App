import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/userActions';

const Options = () => {
   const dispatch = useDispatch();

   const [show, setShow] = useState(false);
   const [showContainer, setShowContainer] = useState(false);

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   useEffect(() => {
      if (user) {
         setShow(true);
      } else {
         setShow(false);
      }
   }, [user]);

   const logout = () => {
      dispatch(logoutUser());

      setShowContainer(false);
   };

   return (
      <div className="options">
         {show && (
            <div
               onClick={() => setShowContainer(!showContainer)}
               className="option-icon"
            >
               <i className="fas fa-user"></i>
            </div>
         )}

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
         </div>
      </div>
   );
};

export default Options;
