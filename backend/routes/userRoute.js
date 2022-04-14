import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Import User Model
import User from '../models/userModel.js';

// Register new User
// POST @/api/users
// Public
router.post('/', (req, res) => {
   const { firstName, lastName, email, birthday, password } = req.body;

   // Validation
   if (!firstName || !lastName || !email || !birthday || !password) {
      res.status(400).json({ msg: 'Please enter all fields!' });
   } else if (password.length <= 7) {
      res.status(400).json({ msg: 'Password should be at least 8 character!' });
   } else {
      User.findOne({ email })
         .then((user) => {
            if (user)
               return res.status(400).json({ msg: 'User already exists!' });

            const newUser = new User({
               firstName,
               lastName,
               email,
               birthday,
               password,
            });

            //  Create a salt
            bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;

                  newUser.password = hash;

                  //   Save user
                  newUser.save().then((user) => {
                     jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET,
                        (err, token) => {
                           if (err) throw err;

                           res.json({
                              token,
                              user: {
                                 id: user._id,
                                 firstName: user.firstName,
                                 lastName: user.lastName,
                                 email: user.email,
                                 birthday: user.birthday,
                              },
                           });
                        }
                     );
                  });
               });
            });
         })
         .catch((err) => res.status(400).json({ msg: 'An error Occured!!!' }));
   }
});

export default router;
