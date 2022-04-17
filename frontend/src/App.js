import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './css/style.css';
import Header from './components/Header';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import RegisterPage from './screens/RegisterPage';
import WelcomePage from './screens/WelcomePage';
import Options from './components/Options';
import ProfilePage from './screens/ProfilePage';
import BirthdaysPage from './screens/BirthdaysPage';
import CreateBirthdayPage from './screens/CreateBirthdayPage';
import BirthdayPage from './screens/BirthdayPage';
import EditProfilePage from './screens/EditProfilePage';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <ScrollToTop />
               <Header />
               <div className="container">
                  <Routes>
                     <Route path="/" element={<HomePage />} />
                     <Route path="/login" element={<LoginPage />} />
                     <Route path="/register" element={<RegisterPage />} />
                     <Route path="/welcome" element={<WelcomePage />} />
                     <Route path="/profile" element={<ProfilePage />} />
                     <Route
                        path="/edit-profile"
                        element={<EditProfilePage />}
                     />
                     <Route path="/birthdays" element={<BirthdaysPage />} />
                     <Route path="/birthday/:id" element={<BirthdayPage />} />
                     <Route
                        path="/create-birthday"
                        element={<CreateBirthdayPage />}
                     />
                  </Routes>
               </div>
               <Options />
               <Footer />
            </Router>
         </Provider>
      );
   }
}

export default App;
