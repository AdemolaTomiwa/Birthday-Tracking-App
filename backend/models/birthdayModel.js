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
         required: true,
         unique: true,
      },
      birthday: {
         type: Date,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Birthday = mongoose.model('birthday', birthdaySchema);

export default Birthday;
