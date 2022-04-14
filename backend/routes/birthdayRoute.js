import express from 'express';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Import User Model
import Birthday from '../models/birthdayModel.js';

// Get all Birthday
// GET @/api/birthday
// Private
router.get('/', auth, (req, res) => {
   Birthday.find()
      .sort({ createdAt: 1 })
      .then((birthday) => res.status(200).json(birthday))
      .catch((err) => res.status(400).json({ msg: 'An error occured!!!' }));
});

export default router;
