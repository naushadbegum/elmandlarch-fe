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
        
        <div className="container d-flex justify-content-center my-3">
            <h3>Thank you for shopping with Elm & Larch ❤️ Redirecting to order summary...</h3>
        </div>
    </React.Fragment>
)

}