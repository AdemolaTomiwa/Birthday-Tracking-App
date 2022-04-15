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
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User',
      },
   },
   {
      timestamps: true,
   }
);

const Birthday = mongoose.model('birthday', birthdaySchema);

export default Birthday;
