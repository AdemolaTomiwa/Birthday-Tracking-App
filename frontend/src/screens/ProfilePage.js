import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { clearErrors } from '../actions/errorActions';
import { getLatestBirthday } from '../actions/birthdayActions';
import Birthday from '../components/Birthday';
import { logoutUser } from '../actions/userActions';

const ProfilePage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userState = useSelector((state) => state.user);
   const { userLoading, user } = userState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   const birthdayState = useSelector((state) => state.birthday);
   const { latestBirthday } = birthdayState;

   let year = user && user.birthday.slice(0, 4);
   let month = user && user.birthday.slice(5, 7);
   let day = user && user.birthday.slice(8, 10);

   const currentYear = new Date().getFullYear();
   const currentMonth = new Date().getMonth();

   let age = currentYear - year;

   if (currentMonth <= Number(month)) {
      age = age - 1;
   }

   useEffect(() => {
      dispatch(clearErrors());
      dispatch(getLatestBirthday());

      if (!user) {
         navigate('/login');
      }
   }, [dispatch, navigate, user]);

   const logout = () => {
      dispatch(logoutUser());

      navigate('/login');
   };

   return (
      <>
         {userLoading ? (
            <Loader />
         ) : msg !== null ? (
            <div className="error-msg">{msg}</div>
         ) : user ? (
            <div className="profile-page">
               <div className="img">
                  <div className="img-name">
                     {/* {!user.imageStr ? (
                        <div className="icon">
                           <i className="fas fa-user"></i>
                        </div>
                     ) : (
                        <img src={user.imageStr} alt={user.firstName} />
                     )} */}
                     <img src={user.imageStr} alt={user.firstName} />

                     <div className="name">
                        <h3>
                           {user.firstName} <span>{user.lastName}</span>
                        </h3>
                        <h5>
                           <span>
                              <Link to="edit-profile">Edit Profile</Link>
                           </span>
                           <span>/</span>
                           <span onClick={logout}>Logout</span>
                        </h5>
                     </div>
                  </div>
                  <div className="age">
                     <h1>{age}</h1>
                  </div>
               </div>

               <div className="boxes">
                  <div className="box">
                     <span>Email</span>
                     <strong>{user.email}</strong>
                     <i className="fas fa-envelope"></i>
                  </div>
                  <div className="box">
                     <span>Birthday</span>
                     <strong>
                        {day}/{month}/{year}
                     </strong>
                     <i className="fas fa-calendar-alt"></i>
                  </div>
               </div>

               <div className="latest-birthdays">
                  <h3>
                     Latest <span>Birthday</span> Schedule
                  </h3>
                  <div className="birthdays">
                     {latestBirthday.map((birthday) => (
                        <Birthday key={birthday._id} birthday={birthday} />
                     ))}
                  </div>
               </div>
            </div>
         ) : null}
      </>
   );
};

export default ProfilePage;
