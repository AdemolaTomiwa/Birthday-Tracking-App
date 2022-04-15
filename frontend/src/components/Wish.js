import React from 'react';

const Wish = ({ name }) => {
   return (
      <div className="wish-message">
         Today is <span className="highlight">{`${name}'s`}</span> Birthday!!!
      </div>
   );
};

export default Wish;
