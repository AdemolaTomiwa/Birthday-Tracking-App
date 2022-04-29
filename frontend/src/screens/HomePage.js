import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../actions/errorActions';
import Meta from '../components/Meta';

const HomePage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   useEffect(() => {
      dispatch(clearErrors());

      if (user) {
         navigate('/welcome');
      }
   }, [navigate, user, dispatch]);

   return (
      <>
         <Meta title="D-Day" />
         <div className="home-page">
            <h1 className="intro">
               D-DAY <span>.</span>
            </h1>
            <h4>
               Never miss a <span>Birthday</span>
            </h4>
            <div className="buttons">
               <Link to="/login">
                  <button className="btn btn-primary">Log In</button>
               </Link>
               <Link to="/register">
                  <button className="btn btn-primary">Sign In</button>
               </Link>
            </div>
         </div>
      </>
   );
};

export default HomePage;
