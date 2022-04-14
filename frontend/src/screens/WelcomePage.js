import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';

const WelcomePage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   // eslint-disable-next-line
   const [date, setDate] = useState('');

   const today = new Date();

   const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
   ];

   const day = `${
      month[today.getMonth()]
   } ${today.getDate()}, ${today.getFullYear()}`;

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   useEffect(() => {
      dispatch(clearErrors());

      if (!user) {
         navigate('/login');
      }

      setDate(day);
   }, [dispatch, day, navigate, user]);

   return (
      <div className="welcome-page">
         {user && (
            <h1>
               Hi {user.firstName} <i className="fas fa-smile"></i>
            </h1>
         )}

         <h4>Today is {day}</h4>

         <div className="buttons">
            <Link to="/birthdays">
               <button className="btn btn-primary">Upcoming Birthdays</button>
            </Link>
            <Link to="/create-birthday">
               <button className="btn btn-primary">
                  Create Bithday Schedule
               </button>
            </Link>
         </div>
      </div>
   );
};

export default WelcomePage;
