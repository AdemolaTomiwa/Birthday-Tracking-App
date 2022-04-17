import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
   const userState = useSelector((state) => state.user);
   const { user } = userState;

   return (
      user && (
         <footer>
            <p>Copyright &copy; 2022 D-Day</p>
         </footer>
      )
   );
};

export default Footer;
