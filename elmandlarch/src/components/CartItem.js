import React from "react";
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ListGroup from "react-bootstrap/esm/ListGroup";
import Form from 'react-bootstrap/Form';

import UserContext from "../contexts/UserContext";

export default function CartItem(props) {
    const variantId = props.cartItem.variant_id;

    // console.log("props", props.cartItem.variant.color.color);
    const userContext = useContext(UserContext);
    const [update, setUpdate]= useState(false);
    console.log('quantity', props.cartItem.quantity);
    const [quantity, setQuantity] = useState(props.cartItem.quantity);
    const [error, setError] = useState(false);

const updateFormFields = (event) => {
    let availableStock = props.cartItem.variant.stock;
    let userQuantity = parseInt(event.target.value);


if (userQuantity > availableStock){
    setQuantity(availableStock)
    setError(true);
}
else if (userQuantity < 1){
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
        <React.Fragment>
            <ListGroup.Item>
            <h6 className='p-0 m-0'>
                {update ? 
                    <div>
                        <label>Update quantity</label>
                        <div>
                            <input type="number"
                                    name="quantity"
                                    value={quantity}
                                    onChange={updateFormFields}
                                    />
                        </div>
                        <Button onClick={updateCart}>Confirm update</Button>
                        <Button onClick={deleteCartItem}>Delete</Button>

                    </div>
                : <React.Fragment>
                {props.cartItem.variant.luggage.model} 
                {props.cartItem.variant.color.color}
                {props.cartItem.quantity}
                <Button onClick={() => {setUpdate(true)}}>Update Quantity</Button>
                    </React.Fragment>
                    }
            </h6>
            </ListGroup.Item>
        </React.Fragment>
    )
}

