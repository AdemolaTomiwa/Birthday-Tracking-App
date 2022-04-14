import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Loader from '../components/Loader';
import { clearErrors } from '../actions/errorActions';

const RegisterPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [birthday, setBirthday] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setshowPassword] = useState(false);

   // Password toggle handler
   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   const userState = useSelector((state) => state.user);
   const { userLoading, user } = userState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());

      if (user) {
         navigate('/welcome');
      }
   }, [navigate, user, dispatch]);

   const onSubmit = (e) => {
      e.preventDefault();

      const user = {
         firstName,
         lastName,
         birthday,
         email,
         password,
      };

      dispatch(registerUser(user));
   };

   return (
      <div className="register-page">
         <h5>Start for Free</h5>
         <h3>
            Create an account <span>.</span>
         </h3>
         <p>
            Already a Member?{' '}
            <Link to="/login">
               <span>Log In</span>
            </Link>
         </p>

         {userLoading && <Loader />}

         <form onSubmit={onSubmit}>
            <div className="error-msg">{msg}</div>
            <div className="group">
               <div>
                  <input
                     type="text"
                     autoComplete="off"
                     name="firstName"
                     placeholder="John"
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                  />
                  <i className="fas fa-address-book"></i>
               </div>
               <div>
                  <input
                     type="text"
                     autoComplete="off"
                     name="lastName"
                     placeholder="Doe"
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                  />
                  <i className="fas fa-address-book"></i>
               </div>
            </div>
            <div>
               <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <i className="fas fa-envelope"></i>
            </div>
            <div>
               <input
                  type="date"
                  name="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
               />
               <i className="fas fa-calendar-alt"></i>
            </div>
            <div>
               <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="off"
                  placeholder="password12345"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <i
                  onClick={togglePassword}
                  className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}
               ></i>
            </div>
            <div>
               <button className="btn btn-primary">Create Account</button>
            </div>
         </form>
      </div>
   );
};

export default RegisterPage;
