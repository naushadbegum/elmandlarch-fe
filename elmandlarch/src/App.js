import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Luggages from './pages/Luggages';
import LuggagesProvider from './providers/LuggagesProvider';
import Banner from './components/Banner';


function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="nav">
          <Banner />
        </div>
        <Routes>
          <Route path='/' element=
          {
          <LuggagesProvider>
            <Luggages/>
          </LuggagesProvider>}
          />

        </Routes>
      </Router>
      
    </React.Fragment>
  );
}

export default App;
