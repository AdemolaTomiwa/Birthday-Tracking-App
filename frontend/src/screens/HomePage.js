import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
   return (
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
   );
};

export default HomePage;
