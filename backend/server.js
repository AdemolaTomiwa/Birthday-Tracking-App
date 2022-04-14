import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import authRoute from './routes/authRoute.js';
import birthdayRoute from './routes/birthdayRoute.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Mongo Connect
mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log('MongoDB Connected!!!'))
   .catch(() => console.log('An error occured!!!'));

// Api Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/birthday', birthdayRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Stated on port ${PORT}`));
