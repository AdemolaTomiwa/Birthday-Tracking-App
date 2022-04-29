import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import Loader from '../components/Loader';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const LoginPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [showPassword, setshowPassword] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

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
         email,
         password,
      };

      dispatch(loginUser(user));
   };

   return (
      <>
         <Meta title="D-Day | Login" />
         <div className="login-page">
            <h5>Start for Free</h5>
            <h3>
               Log into your account <span>.</span>
            </h3>
            <p>
               Don't have an account?{' '}
               <Link to="/register">
                  <span>Create an account</span>
               </Link>
            </p>
            {userLoading && <Loader />}

            <form onSubmit={onSubmit}>
               <div className="error-msg">{msg}</div>
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
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     autoComplete="off"
                     placeholder="password12345"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                     onClick={togglePassword}
                     className={
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }
                  ></i>
               </div>
               <div>
                  <button className="btn btn-primary">Log In</button>
               </div>
            </form>
         </div>
      </>
   );
};

export default LoginPage;
