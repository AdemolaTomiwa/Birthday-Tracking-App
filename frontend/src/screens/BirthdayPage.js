import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBirthday, getBirthday } from '../actions/birthdayActions';
import Loader from '../components/Loader';
import BirthdayPanel from '../components/BirthdayPanel';
import AlertModal from '../components/AlertModal';
import Email from '../components/Email';

const BirthdayPage = () => {
   const params = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [openModal, setOpenModal] = useState(false);

   const birthdayState = useSelector((state) => state.birthday);
   const { birthdayLoading, birthday } = birthdayState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   let year = birthday && birthday.birthday.slice(0, 4);
   let month = birthday && birthday.birthday.slice(6, 7);
   let day = birthday && birthday.birthday.slice(8, 10);

   const currentTime = new Date();

   const currentYear = currentTime.getFullYear();
   const currentMonth = currentTime.getMonth();

   // get current year

   // Getting the Birthday in Data Object
   // WE subtract 1 from momnth ; Months start from 0 in Date Object
   // Bithday Boolean
   const isItBday =
      currentTime.getDate() === Number(day) &&
      currentTime.getMonth() === Number(month) - 1;

   let age = currentYear - year;

   if (currentMonth <= Number(month)) {
      if (!isItBday) {
         age = age - 1;
      }
   }

   useEffect(() => {
      if (!user) {
         navigate('/login');
      }

      if (!birthday || birthday._id !== params.id) {
         dispatch(getBirthday(params.id));
      }
   }, [dispatch, params, birthday, navigate, user]);

   const confirmDeleteHandler = (id) => {
      setOpenModal(false);

      dispatch(deleteBirthday(id));

      navigate('/birthdays');
   };

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
                        <div className={isItBday ? 'age-active' : 'age'}>
                           <h1>{age}</h1>
                        </div>
                     </div>
                     <div className="name">
                        <h2>
                           {birthday.firstName} <span>{birthday.lastName}</span>
                        </h2>
                        <h4>
                           {day}/{month}/{year}
                        </h4>
                     </div>
                     <BirthdayPanel
                        name={birthday.firstName}
                        day={Number(day)}
                        month={Number(month)}
                     />
                     <div className="delete-btn">
                        <i
                           onClick={() => setOpenModal(true)}
                           className="fas fa-trash"
                        ></i>
                     </div>
                     <AlertModal
                        open={openModal}
                        body={`Are you sure want to delete ${birthday.firstName} birthday schedule?`}
                        close={() => setOpenModal(false)}
                        accept={() => confirmDeleteHandler(birthday._id)}
                     />

                     {/* {isItBday && (
                        <Email
                           birthdayDetails={birthday}
                           age={age}
                           user={user}
                        />
                     )} */}
                  </div>
               )}
            </>
         )}
      </>
   );
};

export default BirthdayPage;
