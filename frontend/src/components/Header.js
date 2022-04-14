import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';

const Header = () => {
   const dispatch = useDispatch();

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   // eslint-disable-next-line
   const [date, setDate] = useState('');

   const today = new Date();

   const day = `${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`;
   useEffect(() => {
      dispatch(clearErrors());

      setDate(day);
   }, [dispatch, day]);

   return (
      <header>
         <Link to="/">
            <div className="logo">
               <div className="logo-item"></div>
               <h5>D-Day</h5>
            </div>
         </Link>

         {user && (
            <div className="date">
               <h4>{day}</h4>
            </div>
         )}
      </header>
   );
};

export default Header;
