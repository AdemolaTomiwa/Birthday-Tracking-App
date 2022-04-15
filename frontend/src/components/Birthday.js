import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const Birthday = ({ birthday }) => {
   // const fullMonth = [
   //    'January',
   //    'February',
   //    'March',
   //    'April',
   //    'May',
   //    'June',
   //    'July',
   //    'August',
   //    'September',
   //    'October',
   //    'November',
   //    'December',
   // ];

   const birthdayState = useSelector((state) => state.birthday);
   const { birthdayLoading } = birthdayState;

   // let year = birthday.birthday.slice(0, 4);
   let month = birthday.birthday.slice(5, 7);
   let day = birthday.birthday.slice(8, 10);

   return (
      <>
         {birthdayLoading ? (
            <Loader />
         ) : (
            <div className="birthday">
               <div className="img">
                  <img src={birthday.imageStr} alt={birthday.firstName} />
               </div>
               <div className="name">
                  <h4>
                     {birthday.firstName} <span>{birthday.lastName}</span>
                  </h4>
                  <p>29 Days 14 Hours remaining</p>
               </div>
               <div className="date">
                  <h5>
                     {day}/{month}
                  </h5>
               </div>
            </div>
         )}
      </>
   );
};

export default Birthday;
