import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { clearErrors } from '../actions/errorActions';
import axios from 'axios';

const RegisterPage = () => {
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
   // const [errorMsg, setErrorMsg] = useState('');
   const [previewSource, setPreviewSource] = useState('');

   // Password toggle handler
   const togglePassword = () => {
      setshowPassword(!showPassword);
   };

   const userState = useSelector((state) => state.user);
   const { userLoading, user } = userState;

   const errorState = useSelector((state) => state.error);
   const { msg } = errorState;

   useEffect(() => {
      dispatch(clearErrors());

      if (user) {
         navigate('/welcome');
      }
   }, [navigate, user, dispatch]);

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

      const user = {
         firstName,
         lastName,
         birthday,
         email,
         password,
         imageStr,
      };

      dispatch(registerUser(user));
   };

   return (
      <>
         <Meta title="D-Day | Register" />
         <div className="register-page">
            <h5>Start for Free</h5>
            <h3>
               Create an account <span>.</span>
            </h3>
            <p>
               Already a Member?{' '}
               <Link to="/login">
                  <span>Log In</span>
               </Link>
            </p>

            {userLoading && <Loader />}

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
                  {/* <div style={{ width: '100%' }} className="error-msg">
                  {errorMsg}
               </div> */}
                  <input
                     type="file"
                     onChange={handleFileInputChange}
                     value={fileInputState}
                     name="image"
                     className="form-image"
                  />
               </div>
               {/* <div className="error-msg">{msg}</div> */}
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
                  <button className="btn btn-primary">Create Account</button>
               </div>
            </form>
         </div>
      </>
   );
};

export default RegisterPage;
