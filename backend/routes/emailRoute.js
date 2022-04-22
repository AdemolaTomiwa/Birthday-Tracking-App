import express from 'express';

import mg from 'mailgun-js';

const router = express.Router();

import Birthday from '../models/birthdayModel.js';

// Get all Birthday List
// GET @/api/birthday/
// Private
const sendEmail = () => {
   Birthday.find()
      .sort({ createdAt: -1 })
      .then((birthdays) => {
         const today = new Date();

         const isBday = birthdays.filter(
            (birthday) =>
               birthday.birthday.getMonth() === today.getMonth() &&
               birthday.birthday.getDate() === today.getDate()
         );

         isBday.map((birthday) => {
            const userFirstName = birthday.userObject.firstName;
            const userLastName = birthday.userObject.lastName;
            const firstName = birthday.firstName;
            const lastName = birthday.lastName;
            const email = birthday.email;
            const userEmail = birthday.userObject.email;

            const mailgun = () =>
               mg({
                  apiKey: process.env.MAILGUN_API_KEY,
                  domain: process.env.MAILGUN_DOMIAN,
               });

            mailgun()
               .messages()
               .send(
                  {
                     from: `${userFirstName} ${userLastName} <d-day@gmail.com>`,
                     to: `${email}`,
                     subject: `Happy Birthday ${firstName} ${lastName}`,
                     html: `
                      <h1>Happy Birthday ${firstName}</h1>
                      <p>I, <strong>${userFirstName}</strong>, wish you happy birthday, long life and prosperity, many more years to come. May the good Lord bless your nice age. You are <strong>200</strong> this year, next year, you would be a year old.</p>
                      <h3>Happy birthday</h3>
                      <h4>${userFirstName} ${userLastName}</h4>
                   `,
                  },
                  (error, body) => {
                     if (error) {
                        console.log(error);
                     } else {
                        console.log('Successfully');
                     }
                  }
               );

            // Send notification email to owner
            mailgun()
               .messages()
               .send(
                  {
                     from: `D-Day <d-day@gmail.com>`,
                     to: `${userEmail}`,
                     subject: `Today is ${firstName} ${lastName}'s Birthday`,
                     html: `
                      <h1>Today is ${firstName}'s birthday</h1>
                      <p><strong>D-Day</strong> would like to remind you that it is ${firstName} ${lastName} birthday.</p>
                      <h3>Thank You, D-Day</h3>
                   `,
                  },
                  (error, body) => {
                     if (error) {
                        console.log(error);
                     } else {
                        console.log('Successfully');
                     }
                  }
               );
         });
      })
      .catch((err) => console.log(err));
};

sendEmail();

setTimeout(sendEmail, 86400000);

export default router;
