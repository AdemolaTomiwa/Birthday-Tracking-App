import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createBirthday } from '../actions/birthdayActions';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

const CreateBirthdayPage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [birthday, setBirthday] = useState('');
   const [imageStr, setImageStr] = useState('');
   const [fileInputState] = useState('');
   const [imageFilled, setImageFilled] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');
   const [previewSource, setPreviewSource] = useState('');

   const birthdayState = useSelector((state) => state.birthday);
   const { success, birthdayLoading } = birthdayState;

   const userState = useSelector((state) => state.user);
   const { user } = userState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      if (!user) {
         navigate('/login');
      }

      if (success) {
         navigate('/birthdays');
      }
   }, [navigate, success, user]);

   const handleFileInputChange = (e) => {
      const file = e.target.files[0];

      previewFile(file);

      setImageFilled(true);
   };

   const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setPreviewSource(reader.result);
         setErrorMsg('');
         uploadImage(reader.result);
      };
   };

   const uploadImage = (base64EncodedImage) => {
      axios
         .post('/api/uploads', { data: base64EncodedImage })
         .then((res) => {
            setImageStr(res.data);
         })
         .catch((err) => console.log(err));
   };

   const onSubmit = (e) => {
      e.preventDefault();

      const newBirthday = {
         firstName,
         lastName,
         email,
         birthday,
         imageStr,
         user: user.id,
         userObject: user,
      };

      if (!imageFilled || !firstName || !lastName || !birthday || !imageStr) {
         setErrorMsg('Please enter all fields!!!');
      } else {
         dispatch(createBirthday(newBirthday));
      }
   };

   return (
      <>
         <Meta title="D-Day | Create Birthday" />
         <div className="create-birthday-page">
            <h3>
               Create <span>Birthday</span> Schedule
            </h3>

            {birthdayLoading && <Loader />}

            <form onSubmit={onSubmit}>
               <div className="form-img">
                  <div className="img-container">
                     {previewSource ? (
                        <img src={previewSource} alt="chosen" className="img" />
                     ) : (
                        <div className="img">
                           <p>Take Photo</p>
                        </div>
                     )}
                  </div>
                  <div
                     style={{ width: '100%', margin: '1rem 0' }}
                     className="error-msg"
                  >
                     {msg}
                  </div>
                  <div style={{ width: '100%' }} className="error-msg">
                     {errorMsg}
                  </div>
                  <input
                     type="file"
                     onChange={handleFileInputChange}
                     value={fileInputState}
                     name="image"
                     className="form-image"
                  />
               </div>

               <div className="group">
                  <div>
                     <input
                        type="text"
                        autoComplete="off"
                        name="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                     />
                     <i className="fas fa-address-book"></i>
                  </div>
                  <div>
                     <input
                        type="text"
                        autoComplete="off"
                        name="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                     />
                     <i className="fas fa-address-book"></i>
                  </div>
               </div>
               <div>
                  <input
                     type="email"
                     autoComplete="off"
                     name="email"
                     placeholder="abc@gmail.com (optional)"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <i className="fas fa-envelope"></i>
               </div>
               <div>
                  <input
                     type="date"
                     name="date"
                     value={birthday}
                     onChange={(e) => setBirthday(e.target.value)}
                  />
                  <i className="fas fa-calendar-alt"></i>
               </div>
               <div>
                  <button className="btn btn-primary">
                     Create Birthday Schedule
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default CreateBirthdayPage;
