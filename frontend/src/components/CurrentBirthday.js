import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const CurrentBirthday = ({ birthday }) => {
   const birthdayState = useSelector((state) => state.birthday);
   const { birthdayLoading } = birthdayState;

   // let year = birthday.birthday.slice(0, 4);
   let month = birthday.birthday.slice(5, 7);
   let day = birthday.birthday.slice(8, 10);

   const currentTime = new Date();
   // get current year

   // Getting the Birthday in Data Object
   // WE subtract 1 from momnth ; Months start from 0 in Date Object
   // Bithday Boolean
   const isItBday =
      currentTime.getDate() === Number(day) &&
      currentTime.getMonth() === Number(month) - 1;

   return (
      <>
         {birthdayLoading ? (
            <Loader />
         ) : (
            <>
               <div className={isItBday ? 'birthday-active' : 'birthday'}>
                  <div className="img">
                     <Link to={`/birthday/${birthday._id}`}>
                        <img src={birthday.imageStr} alt={birthday.firstName} />
                     </Link>
                  </div>
                  <div className="name">
                     <Link to={`/birthday/${birthday._id}`}>
                        <h4>
                           {birthday.firstName} <span>{birthday.lastName}</span>
                        </h4>
                     </Link>
                  </div>
                  <div className="date">
                     <Link to={`/birthday/${birthday._id}`}>
                        <h5>
                           {day} / {month}
                        </h5>
                     </Link>
                  </div>
               </div>
            </>
         )}
      </>
   );
};

export default CurrentBirthday;
