import mongoose from 'mongoose';

const birthdaySchema = new mongoose.Schema(
   {
      firstName: {
         type: String,
         required: true,
      },
      lastName: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: false,
         unique: true,
      },
      birthday: {
         type: Date,
         required: true,
      },
      imageStr: {
         type: String,
         required: false,
      },
   },
   {
      timestamps: true,
   }
);

const Birthday = mongoose.model('birthday', birthdaySchema);

export default Birthday;
