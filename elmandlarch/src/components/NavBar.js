import React, {useState, useContext, useEffect, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
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
      </>
    );
}