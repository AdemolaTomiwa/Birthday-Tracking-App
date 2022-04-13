import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
   return (
      <div className="login-page">
         <h4>Start for Free</h4>
         <h3>
            Log into your account <span>.</span>
         </h3>
         <p>
            Don't have an account? <Link to="/register">Create an account</Link>
         </p>

         <form>
            <div>
               <label htmlFor="email">Email</label>
               <input id="email" type="email" name="email" />
               <i className="fas fa-address-book"></i>
            </div>
            <div>
               <label htmlFor="password">Password</label>
               <input id="password" type="password" name="password" />
               <i className="fas fa-key"></i>
            </div>
            <div>
               <button className="btn btn-primary">Log In</button>
            </div>
         </form>
      </div>
   );
};

export default LoginPage;
