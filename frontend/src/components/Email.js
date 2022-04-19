import React, { useState } from 'react';
import axios from 'axios';

const Email = ({ birthdayDetails, user, age }) => {
   const [msg, setMsg] = useState('');

   const { firstName, lastName, email, birthday } = birthdayDetails;

   let month = birthday.slice(6, 7);
   let day = birthday.slice(8, 10);

   const data = {
      firstName,
      lastName,
      email,
      month,
      day,
      userFirstName: user.firstName,
      userLastName: user.lastName,
      userEmail: user.email,
      age,
   };

   axios
      .post('/api/email/recipient', data)
      .then((res) => setMsg(res.data.msg))
      .catch((err) => setMsg(err.response.data.msg));

   return <div className="email">{msg}</div>;
};

export default Email;
