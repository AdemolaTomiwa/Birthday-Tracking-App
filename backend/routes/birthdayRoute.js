import express from 'express';
import { auth } from '../middleware/auth.js';
import cloudinary from '../middleware/cloudinary.js';

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

router.post('/uploads', async (req, res) => {
   const fileStr = req.body.data;

   const { url } = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'birthday_images',
   });

   getUrl(url);
});

const getUrl = (url) => {
   router.post('/', (req, res) => {
      const { firstName, lastName, email, birthday, imageStr } = req.body;

      const newBirthday = new Birthday({
         firstName,
         lastName,
         email,
         birthday,
         imageStr: url,
      });

      console.log(newBirthday);
   });
};

export default router;
