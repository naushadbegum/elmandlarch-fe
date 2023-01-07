import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Luggages from './pages/Luggages';
import LuggagesProvider from './providers/LuggagesProvider';
import Banner from './components/Banner';
import NavBar from './components/NavBar';

import UserProvider from './providers/UserProvider';
import Register from './pages/Register';
import Login from './pages/Login';
import SingleDetail from './pages/SingleDetail';

function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="nav">
          <Banner />
          <UserProvider>
            <LuggagesProvider>
              <NavBar />
            </LuggagesProvider>
          </UserProvider>
          
          
        </div>
        <Routes>
          <Route path='/' element=
          {
          <LuggagesProvider>
            <Luggages/>
          </LuggagesProvider>}
          />

        </Routes>
        <Routes>
          <Route path='/register' element=
          {
          <UserProvider>
            <Register />
          </UserProvider>}
          />

        </Routes>
        <Routes>
          <Route path='/login' element=
          {
          <UserProvider>
            <Login />
          </UserProvider>}
          />

        </Routes>

        {/* <Routes>
          <Route path='/detail'
          element=
          {
          <UserProvider>
            <SingleDetail />
          </UserProvider>}
          />
        </Routes> */}

<Routes>
          <Route path='/luggages/:luggageId/more' element=
          {
          <UserProvider>
            <SingleDetail />
          </UserProvider>}
          />

        </Routes>
      </Router>
      
    </React.Fragment>
  );
}

export default App;
