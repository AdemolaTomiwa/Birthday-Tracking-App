import express from 'express';
import mg from 'mailgun-js';

const router = express.Router();

const mailgun = () =>
   mg({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMIAN,
   });

// setTimeout(mailgun, 86400000);

router.post('/recipient', (req, res) => {
   const { firstName, lastName, email, userFirstName, userLastName, age } =
      req.body;

   mailgun()
      .messages()
      .send(
         {
            from: `${userFirstName} ${userLastName} <d-day@gmail.com>`,
            to: `${email}`,
            subject: `Happy Birthday ${firstName} ${lastName}`,
            html: `
                <h1>Happy Birthday ${firstName}</h1>
                <p>I, <strong>${userFirstName}</strong>, wish you happy birthday, long life and prosperity, many more years to come. May the good Lord bless your nice age. You are <strong>${age}</strong> this year, next year, you would be a year old.</p>
                <h3>Happy birthday</h3>
                <h4>${userFirstName} ${userLastName}</h4>
             `,
         },
         (error, body) => {
            if (error) {
               res.status(500).json({
                  msg: `An error occured while sending the birthday wishes to ${firstName}`,
               });
            } else {
               res.status(200).json({
                  msg: `Birthday wishes sent successfully to ${firstName}`,
               });
            }
         }
      );
});

export default router;
