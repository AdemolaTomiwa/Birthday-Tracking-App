import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Import User Model
import Birthday from '../models/birthdayModel.js';

// Get all Birthday List for Logged in user
// GET @/api/birthday/mine
// Private
router.get('/', auth, (req, res) => {
   Birthday.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .then((birthday) => res.status(200).json(birthday))
      .catch((err) => res.status(400).json({ msg: 'An error occured!!!' }));
});

// Get single birthday
// GET @/api/birthday/:id
// Private
router.get('/:id', auth, (req, res) => {
   Birthday.findById(req.params.id)
      .then((birthday) => {
         if (birthday) {
            res.status(200).json(birthday);
         } else {
            res.status(400).json({ msg: 'An error has occured!!!' });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!!!' }));
});

// Create a birthday
// POST @/api/birthday/
// Private
router.post('/', auth, (req, res) => {
   const { firstName, lastName, email, birthday, imageStr, user } = req.body;

   const newBirthday = new Birthday({
      firstName,
      lastName,
      email,
      birthday,
      imageStr,
      user,
   });

   newBirthday
      .save()
      .then((birthday) => {
         res.status(200).json(birthday);
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Get Latest birthday
// GET @/api/birthday/latest
// PRIVATE
router.get('/latest/birthday', auth, (req, res) => {
   Birthday.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(3)
      .then((birthday) => res.status(200).json(birthday))
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

// Delete a birthday
// DELETE @/api/birthday/:id
// Private
router.delete('/:id', auth, (req, res) => {
   Birthday.findById(req.params.id)
      .then((birthday) => {
         if (birthday) {
            birthday
               .remove()
               .then(() => res.status(200).json({ msg: 'Birthday Deleted!' }))
               .catch((err) =>
                  res.status(400).json({ msg: 'An error occured!' })
               );
         } else {
            res.status(400).json({ msg: 'Birthday schedule does not exist!' });
         }
      })
      .catch((err) => res.status(400).json({ msg: 'An error occured!' }));
});

export default router;
