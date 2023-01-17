import React from "react";
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/esm/ListGroup";
import Form from 'react-bootstrap/Form';
import {FaEdit} from 'react-icons/fa';
import UserContext from "../contexts/UserContext";
import {TiTick} from 'react-icons/ti';
import {TiDelete} from 'react-icons/ti';

export default function CartItem(props) {
    const variantId = props.cartItem.variant_id;

    // console.log("props", props.cartItem.variant.color.color);
    const userContext = useContext(UserContext);
    const [update, setUpdate] = useState(false);
    console.log('quantity', props.cartItem.quantity);
    const [quantity, setQuantity] = useState(props.cartItem.quantity);
    const [error, setError] = useState(false);

    const updateFormFields = (event) => {
        let availableStock = props.cartItem.variant.stock;
        let userQuantity = parseInt(event.target.value);


        if (userQuantity > availableStock) {
            setQuantity(availableStock)
            setError(true);
        }
        else if (userQuantity < 1) {
            setQuantity(1)
            setError(true);
        }
        else {
            setQuantity(event.target.value)
        }
    }

    // const confirmUpdate = (event) => {
    //     updateCart(quantity);
    // }

    const deleteCartItem = async () => {
        await userContext.refreshToken();

        await userContext.deleteCartItem(variantId);
    }


    const updateCart = async () => {
        await userContext.refreshToken();

        await userContext.updateCart(variantId, quantity);

        setUpdate(false);
    }

    return (
        <ListGroup.Item>
            <div className="container">
                <div className="row-cart">
                    <div className="col-3 d-flex align-items-center">
                        <img className='cart-image'
                            src={props.cartItem.variant.thumbnail_url}
                            alt='thumbnail of luggage'
                        />
                    </div>
                    {update ?
                        <div className='col-9 d-flex flex-column justify-content-center align-items-start pt-2'>
                            <h6 className="p-0 m-0">
                                   {props.cartItem.variant.luggage.brand.brand}{''}
                                    <div></div>
                                   {props.cartItem.variant.luggage.model}
                            </h6>
                            <span className="normal-font quantity-cart mt-1">
                                Update Quantity: {''}
                            </span>
                            <div className="d-flex align-items-center mt-1">
                                <Form.Control className="quantity-cart-form"
                                    type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={updateFormFields}
                                    min={1}
                                />
                                <Button
                                    className='login-button'
                                    onClick={updateCart}><TiTick/></Button>
                                <Button className='login-button'
                                    onClick={deleteCartItem}><TiDelete/></Button>
                            </div>
                        </div>
                        : <React.Fragment>
                            <div className='col-8 d-flex flex-column justify-content-center pt-2'>
                                <h6 className="p-0 m-0">
                                   {props.cartItem.variant.luggage.brand.brand}{''}
                                    <div></div>
                                   {props.cartItem.variant.luggage.model}
                                </h6>
                                <ul className="normal-font cart-offcanvas pt-1">
                                    <li>Color: {''}
                                        {props.cartItem.variant.color.color}
                                    </li>
                                    <li>Quantity: {''}
                                        {props.cartItem.quantity}
                                    </li>
                                    <li>
                                        Price: ${(props.cartItem.variant.luggage.cost) / 100}
                                    </li>
                                </ul>
                            </div>
                            <div className='col-1 d-flex flex-column justify-content-start align-items-center'>
                                <Button onClick={() => { setUpdate(true) }} className="login-button pt-1"><FaEdit/></Button>
                            </div>
                        </React.Fragment>
                    }
                </div>
            </div>
        </ListGroup.Item>
    );
}

