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
import Story from './pages/Story';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Orders from './pages/Orders';


function App() {
  return (
    <React.Fragment>
      <Router>
        <div className="nav">
          {/* <Banner /> */}
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
        <Routes>
          <Route path='/story' element=
          {
            <Story />
          }
          />

        </Routes>
        <Routes>
          <Route path='/checkout' element=
          {
          <UserProvider>
            <Checkout />
          </UserProvider>}
          />

        </Routes>

        <Routes>
          <Route path='/checkout/success' element=
          {
          <UserProvider>
            <CheckoutSuccess />
          </UserProvider>}
          />

        </Routes>

        <Routes>
          <Route path='/orders' element=
          {
          <UserProvider>
            <Orders />
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
          <LuggagesProvider>
            <SingleDetail />
          </LuggagesProvider>
          </UserProvider>}
          />

        </Routes>
      </Router>
      
    </React.Fragment>
  );
}

export default App;