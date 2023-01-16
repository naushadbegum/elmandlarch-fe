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
import css from '../css/style.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FaShoppingCart} from 'react-icons/fa';
import {FaUserAlt} from 'react-icons/fa';
import {IoMenuOutline} from 'react-icons/io5';

export default function NavBar(){
  

  // const shoppingIcon = <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />

  // menu bar 
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

const home = () => {
  navigateTo("/");
  setShow(false);
}

  const story = () => {
    navigateTo("/story");
    setShow(false);
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

<Navbar bg="light" expand="lg" collapseOnSelect={true} className="navbar">
      <Container className='nav-container'>
        <Navbar.Brand className="nav_menu"eventKey="1" onClick={()=> {
          handleShow()
        }}><IoMenuOutline /></Navbar.Brand>
        <Offcanvas show={show} onHide={handleClose} placement="start" >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title><img src="E.png" alt="e&l logo" width="200" height="200"/></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h3 onClick={home} className="menu-name">Luggages</h3>
            <h3 onClick={story} className="menu-name">Our Story</h3>
            </Offcanvas.Body>
        </Offcanvas>
        <Navbar.Toggle className='nav_toggler' aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link eventKey="2" as={Link} to='/'>
            Elm & Larch
          </Nav.Link>
          {/* <Nav.Link eventKey="2" as={Link} to='/story'>About Us</Nav.Link>  */}
          <Nav.Link eventKey="3" as={Link} to='/login'>
            <FaUserAlt /></Nav.Link>
          <Nav.Link eventKey="4" onClick={()=> {
             getCartItems();
             handleCartShow()
          }}><FaShoppingCart/></Nav.Link>
          {/* <Nav.Link eventKey="4" as={Link} to='/orders'>Orders</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Offcanvas show={cartShow} onHide={handleCartClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {cartFilled ? renderCartItems() : ''}
            {cartFilled && cartItems.length ? (<div className='d-flex justify-content-center mt-4'><Button onClick={checkout} className="login-button">Checkout</Button></div>): ''}
            </Offcanvas.Body>
        </Offcanvas>
      </React.Fragment>
      
    );
}