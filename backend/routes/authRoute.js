import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Import User Model
import User from '../models/userModel.js';

// Login a User
// POST @/api/auth
// Public
router.post('/', (req, res) => {
   const { email, password } = req.body;

   // Validation
   if (!email || !password) {
      res.status(400).json({ msg: 'Please enter all fields!' });
   } else {
      User.findOne({ email })
         .then((user) => {
            if (!user)
               return res.status(400).json({ msg: 'User does not exist!' });

            //    Validate Password
            bcrypt
               .compare(password, user.password)
               .then((isMatch) => {
                  // Validate password
                  if (!isMatch) {
                     return res
                        .status(400)
                        .json({ msg: 'Invalid Credentials!' });
                  }

                  jwt.sign({ id: user._id }, process.env.JWT_SECRET, (err) => {
                     if (err) throw err;

                     res.status(200).json({
                        user: {
                           id: user._id,
                           firstName: user.firstName,
                           lastName: user.lastName,
                           email: user.email,
                           birthday: user.birthday,
                        },
                     });
                  });
               })
               .catch((err) => console.log(err));
         })
         .catch((err) => console.log(err));
   }
});

export default router;
