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

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Router>
               <Header />
               <div className="container">
                  <Routes>
                     <Route path="/" element={<HomePage />} />
                     <Route path="/login" element={<LoginPage />} />
                     <Route path="/register" element={<RegisterPage />} />
                     <Route path="/welcome" element={<WelcomePage />} />
                  </Routes>
               </div>
               <Options />
            </Router>
         </Provider>
      );
   }
}

export default App;
