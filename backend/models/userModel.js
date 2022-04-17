import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
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
      password: {
         type: String,
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

const User = mongoose.model('user', userSchema);

export default User;
