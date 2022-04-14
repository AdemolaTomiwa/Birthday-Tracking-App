import React, { useState } from 'react';

const CreateBirthdayPage = () => {
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [birthday, setBirthday] = useState('');

   const [fileInputState, setFileInputState] = useState('');
   const [previewSource, setPreviewSource] = useState('');
   const [selectedFile, setSelectedFile] = useState();

   const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
   };

   const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
         setPreviewSource(reader.result);
      };
   };

   return (
      <div className="create-birthday-page">
         <h3>
            Create <span>Birthday</span> Schedule
         </h3>

         <form>
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
   );
};

export default CreateBirthdayPage;
