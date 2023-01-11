import React, {useState, useContext, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ListGroup from 'react-bootstrap/ListGroup';
import CartItem from './CartItem';
import LuggagesContext from '../contexts/LuggagesContext';

export default function NavBar(){
  
  // menu bar 
    
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

// cart bar

  // const navigate = useNavigate();
  const luggugeContext = useContext(LuggagesContext);
	const userContext = useContext(UserContext);
	const [reload, setReload] = useState(false); // Triggered by cart item 
  const [cartShow, setCartShow] = useState(false);
  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => setCartShow(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartFilled, setCartFilled] = useState(false);

  const navigateTo = useNavigate();
  const login = () => {
    navigateTo("/login")
  }


  const checkout = () => {
		setCartShow(false); 
		navigateTo('/checkout')
	}

  useEffect(() => {
		(async () => {
			if (reload) {
				// Get cart (reload)
				setCartFilled(false); // Trigger spinner animation

				// Refresh token
				const valid = await userContext.refreshToken();

				if (!valid) {
					setCartShow(false); // Close cart offcanvas if open
				}

				const cartItems = await userContext.getCart();
				setCartItems(cartItems);
				setCartFilled(true);
				setReload(false);
			}
		})();
	}, [reload]);


  const getCartItems = async () => {
    const valid = await userContext.refreshToken();

    console.log(valid);
    if(!valid) {
      return
    }

    // handleCartShow();
    console.log("check 67 hi");
    const cartItems = await userContext.getCart();
    setCartItems(cartItems);
    setCartFilled(true);
  }
  const renderCartItems = () => {
    if(cartItems.length) {
      return (
        <ListGroup>
          {
            cartItems.map(cartItem => {
              return <CartItem key={cartItem.id} cartItem={cartItem} />
            })
          }
        </ListGroup>

      )
    }else {
      alert('nothing in your cart')
    }
  }

    return (
      <React.Fragment>

<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Elm & Larch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link eventKey="1" as={Link} to='/'>Home</Nav.Link>
          <Nav.Link eventKey="2" as={Link} to='/story'>About Us</Nav.Link>
          <Nav.Link eventKey="3" as={Link} to='/login'>Account</Nav.Link>
          <Nav.Link eventKey="4" onClick={()=> {
             getCartItems();
             handleCartShow()
          }}>Cart</Nav.Link>
          <Nav.Link eventKey="5" as={Link} to='/orders'>Orders</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  {/* handleCartShow(); */}
        <Offcanvas show={cartShow} onHide={handleCartClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cartFilled ? renderCartItems() : ''}
            {cartFilled && cartItems.length ? (<Button onClick={checkout}>Checkout</Button>): ''}
            </Offcanvas.Body>
        </Offcanvas>
      </React.Fragment>

        //       {/* <Button variant="primary" onClick={handleShow}>
        //   Menu
        // </Button>
  
        // <Offcanvas show={show} onHide={handleClose}>
        //   <Offcanvas.Header closeButton>
        //     <Offcanvas.Title>Menu</Offcanvas.Title>
        //   </Offcanvas.Header>
        //   <Offcanvas.Body>
        //   <Offcanvas.Title>Luggages</Offcanvas.Title>
        //   <Offcanvas.Title>Our Story</Offcanvas.Title>
        //   </Offcanvas.Body>
        // </Offcanvas>

        // <Button onClick={login}>Account</Button>

        // <Button variant="primary" onClick={handleCartShow} >
        //   Cart
        // </Button> */}
      
    );
}