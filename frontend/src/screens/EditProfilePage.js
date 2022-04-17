import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { clearErrors } from '../actions/errorActions';
import { updateUserProfile } from '../actions/userActions';

const EditProfilePage = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [birthday, setBirthday] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setshowPassword] = useState(false);
   const [imageStr, setImageStr] = useState('');
   const [fileInputState] = useState('');
   // const [imageFilled, setImageFilled] = useState(false);
   const [errorMsg, setErrorMsg] = useState('');
   const [previewSource, setPreviewSource] = useState('');

   // Password toggle handler
   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   const userState = useSelector((state) => state.user);
   const { userLoading, user, success } = userState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());

      if (!user) {
         navigate('/login');
      }

      if (user) {
         setFirstName(user.firstName);
         setLastName(user.lastName);
         setEmail(user.email);

         const formattedDate = (date) => {
            return date.charAt(10) === 'T' ? date.replace('T', ' ') : date;
         };

         setBirthday(formattedDate(user.birthday.slice(0, 10)));
      }

      if (success) {
         navigate('/profile');
      }
   }, [navigate, user, dispatch, success]);

   const handleFileInputChange = (e) => {
      const file = e.target.files[0];

      previewFile(file);

      // setImageFilled(true);
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
         .catch((err) =>
            setErrorMsg('An error occured! Please upload image again')
         );
   };

   const onSubmit = (e) => {
      e.preventDefault();

      if (!password) {
         setErrorMsg('Please enter password to update profile!');
      } else if (password.length <= 7) {
         setErrorMsg('Password should be at least 8 character!');
      } else {
         const user = {
            firstName,
            lastName,
            birthday,
            email,
            password,
            imageStr,
         };

         dispatch(updateUserProfile(user));
      }
   };
   return (
      user && (
         <div className="edit-profile-page">
            <div className="name-img">
               <h3>
                  Jimmy <span>Inyene</span>
               </h3>

               {previewSource ? (
                  <img src={previewSource} alt="chosen" className="img" />
               ) : (
                  <img src={user.imageStr} alt={user.firstName} />
               )}
            </div>

            {userLoading && <Loader />}

            <form onSubmit={onSubmit}>
               <div className="form-img">
                  <div
                     style={{ width: '100%', margin: '1rem 0' }}
                     className="error-msg"
                  >
                     {errorMsg}
                  </div>
                  <div
                     style={{ width: '100%', margin: '1rem 0' }}
                     className="error-msg"
                  >
                     {msg}
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
                     placeholder="abc@gmail.com"
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
                  <input
                     type={showPassword ? 'text' : 'password'}
                     name="password"
                     autoComplete="off"
                     placeholder="password12345"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                     onClick={togglePassword}
                     className={
                        showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                     }
                  ></i>
               </div>
               <div>
                  <button className="btn btn-primary">Update Account</button>
               </div>
            </form>
         </div>
      )
   );
};

export default EditProfilePage;
