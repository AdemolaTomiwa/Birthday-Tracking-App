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
      .sort({ createdAt: 1 })
      .then((birthday) => res.status(200).json(birthday))
      .catch((err) => res.status(400).json({ msg: 'An error occured!!!' }));
});

// Get single birthday
// GET @/api/birthday/:id
// Private
router.get('/:id', auth, (req, res) => {
   Birthday.findById(req.params.id)
      .then((birthday) => res.status(200).json(birthday))
      .catch((err) => res.status(400).json({ msg: 'An error occured!!!' }));
});

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

export default router;
