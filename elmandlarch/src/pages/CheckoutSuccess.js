import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutSuccess(){

    const navigateTo = useNavigate();

    useEffect(()=> {
        setTimeout(()=> {
            navigateTo("/orders");
        }, 3000);
},[]);

return (
    <React.Fragment>
        <h3>Checkout success. Thank you for shopping with Elm & Larch</h3>
        <p>Redirecting ...</p>
    </React.Fragment>
)

}