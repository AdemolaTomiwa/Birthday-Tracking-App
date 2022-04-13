import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './css/style.css';
import Header from './components/Header';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';

class App extends Component {
   render() {
      return (
         <Router>
            <Header />
            <div className="container">
               <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
               </Routes>
            </div>
         </Router>
      );
   }
}

export default App;
