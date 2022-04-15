import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBirthday } from '../actions/birthdayActions';
import Loader from '../components/Loader';
import BirthdayPanel from '../components/BirthdayPanel';

const BirthdayPage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const birthdayState = useSelector((state) => state.birthday);
   const { birthdayLoading, birthday } = birthdayState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   let year = birthday && birthday.birthday.slice(0, 4);
   let month = birthday && birthday.birthday.slice(5, 7);
   let day = birthday && birthday.birthday.slice(8, 10);

   const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth();

   let age = currentYear - year;

   if (currentMonth <= Number(month)) {
      age = age - 1;
   }

   useEffect(() => {
      if (!user) {
         navigate('/login');
      }

      if (!birthday || birthday._id !== params.id) {
         dispatch(getBirthday(params.id));
      }
   }, [dispatch, params, birthday, navigate, user]);

   return (
      <>
         <Link className="back" to="/birthdays">
            Go Back
         </Link>
         {birthdayLoading ? (
            <Loader />
         ) : msg ? (
            <div className="error-msg">{msg}</div>
         ) : (
            <>
               {birthday && (
                  <div className="birthday-page">
                     <div className="img">
                        <img src={birthday.imageStr} alt={birthday.firstName} />
                        <div className="age">
                           <h1>{age}</h1>
                        </div>
                     </div>
                     <div className="name">
                        <h2>
                           {birthday.firstName} {birthday.lastName}
                        </h2>
                        <h4>
                           {day}/{month}/{year}
                        </h4>
                     </div>
                     <BirthdayPanel
                        name={birthday.firstName}
                        day={day}
                        month={month}
                     />
                  </div>
               )}
            </>
         )}
      </>
   );
};

export default BirthdayPage;
