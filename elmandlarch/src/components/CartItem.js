import React from "react";
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import UserContext from "../contexts/UserContext";

export default function CartItem(props) {
    const variantId = props.cartItem.variant_id;

    console.log("props", props.cartItem.variant.color.color);
    const userContext = useContext(UserContext);

    // const [quantity, setQuantity] = useContext(props.cartItem.quantity);

    console.log('quantity', props.cartItem.quantity);

    const deleteCartItem = async () => {
        await userContext.refreshToken();

        await userContext.deleteCartItem(variantId);
        
    }

    return (
        <React.Fragment>
            <h6 className='p-0 m-0'>
                {
                    props.cartItem.variant.luggage.brand
                        .brand
                }{' '}
                {props.cartItem.variant.luggage.model} 
                {props.cartItem.variant.color.color}
                {props.cartItem.quantity}

                <Button onClick={deleteCartItem}>Delete</Button>
            </h6>
        </React.Fragment>
    )
}

