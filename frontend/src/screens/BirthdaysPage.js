import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getBirthdays } from '../actions/birthdayActions';
import { clearErrors } from '../actions/errorActions';
import Birthday from '../components/Birthday';
import Loader from '../components/Loader';

const BirthdaysPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const birthdayState = useSelector((state) => state.birthday);
   const { birthdayLoading, birthdays } = birthdayState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   useEffect(() => {
      dispatch(clearErrors());
      dispatch(getBirthdays());

      if (!user) {
         navigate('/login');
      }
   }, [dispatch, user, navigate]);

   return (
      <div className="birthdays-page">
         <h3>
            Upcoming <span>Birthday</span>
         </h3>

         <div className="error-msg">{msg}</div>

         {birthdayLoading && <Loader />}

         {birthdays.length === 0 && (
            <div className="success-msg">
               No Birthday Schedule.{' '}
               <Link to="/create-birthday">Create a birthday Schedule</Link>
            </div>
         )}

         <div className="birthdays">
            {birthdays.map((birthday) => (
               <Birthday key={birthday._id} birthday={birthday} />
            ))}
         </div>
      </div>
   );
};

export default BirthdaysPage;
