import React from 'react';
import Wish from './Wish';

const Countdown = ({ countdownData, name }) => {
   if (!countdownData.isItBday) {
      return (
         <div>
            <div className="countdown-wrapper">
               <div className="countdown-box days">
                  {countdownData.days}
                  <span className="legend">Days</span>
               </div>
               <div className="countdown-box">
                  {countdownData.hours}
                  <span className="legend">Hours</span>
               </div>
               <div className="countdown-box">
                  {countdownData.minutes}
                  <span className="legend">Minutes</span>
               </div>
               <div className="countdown-box">
                  {countdownData.seconds}
                  <span className="legend">Seconds</span>
               </div>
            </div>
         </div>
      );
   } else {
      return <Wish name={name} />;
   }
};

export default Countdown;
