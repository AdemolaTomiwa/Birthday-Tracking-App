import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBirthdays } from '../actions/birthdayActions';
import { clearErrors } from '../actions/errorActions';
import Birthday from '../components/Birthday';

const BirthdaysPage = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(clearErrors());
      dispatch(getBirthdays());
   }, [dispatch]);

   return (
      <div className="birthdays-page">
         <h3>
            Upcoming <span>Birthday</span>
         </h3>

         <div className="birthdays">
            <Birthday />
            <Birthday />
            <Birthday />
         </div>
      </div>
   );
};

export default BirthdaysPage;
