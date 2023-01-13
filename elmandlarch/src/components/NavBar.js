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

<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand eventKey="1" onClick={()=> {
          handleShow()
        }}>|||</Navbar.Brand>
        <Offcanvas show={show} onHide={handleClose} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h3 onClick={home}>Luggages</h3>
            <h3 onClick={story}>Our Story</h3>
            </Offcanvas.Body>
        </Offcanvas>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {/* <Nav.Link eventKey="2" as={Link} to='/'>
            Home
          </Nav.Link> */}
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
            {cartFilled && cartItems.length ? (<Button onClick={checkout}>Checkout</Button>): ''}
            </Offcanvas.Body>
        </Offcanvas>
      </React.Fragment>
      
    );
}