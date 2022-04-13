import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   return (
      <header>
         <Link to="/">
            <div className="logo">
               <div className="logo-item"></div>
               <h5>D-Day</h5>
            </div>
         </Link>
      </header>
   );
};

export default Header;
