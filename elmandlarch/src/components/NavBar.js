import React, {useState, useContext, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function NavBar(){
    
  // menu bar 
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

// cart bar

  const navigate = useNavigate();
  const cartContext = useContext(UserContext);

  const [cartShow, setCartShow] = useState(false);
  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => setCartShow(true);

  const login = () => {
    navigate("/login")
  }

    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Menu
        </Button>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <Offcanvas.Title>Luggages</Offcanvas.Title>
          <Offcanvas.Title>Our Story</Offcanvas.Title>
          </Offcanvas.Body>
        </Offcanvas>

        <Button onClick={login}>Account</Button>

        <Button variant="primary" onClick={handleCartShow} >
          Cart
        </Button>

        
  
        <Offcanvas show={cartShow} onHide={handleCartClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
        </Offcanvas>
      </>
    );
}