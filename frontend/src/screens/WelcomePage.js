import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import { getBirthdays } from '../actions/birthdayActions';
import CurrentBirthday from '../components/CurrentBirthday';
import Loader from '../components/Loader';

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

   const birthdayState = useSelector((state) => state.birthday);
   const { birthdays, birthdayLoading } = birthdayState;

   useEffect(() => {
      dispatch(clearErrors());
      dispatch(getBirthdays());

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
                  Create Birthday Schedule
               </button>
            </Link>
         </div>

         {birthdayLoading && <Loader />}

         <div className="current-birthday">
            <div className="birthdays">
               {birthdays.map((birthday) => (
                  <CurrentBirthday key={birthday._id} birthday={birthday} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default WelcomePage;
