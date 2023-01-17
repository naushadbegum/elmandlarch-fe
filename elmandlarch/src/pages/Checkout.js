import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';
import {loadStripe} from '@stripe/stripe-js'

export default function Checkout() {

    const userContext = useContext(UserContext);
    const navigateTo = useNavigate();

    (async () => {

        let sessionIdObj = {};
        let publishableKey = null;

        const stripeData = await userContext.checkout();
        if (!stripeData) {
            navigateTo('/')
            return;
        }

        if (stripeData){
            sessionIdObj = {sessionId: stripeData.sessionId };
            publishableKey = stripeData.publishableKey
        }

        const stripe = await loadStripe(publishableKey);
        stripe.redirectToCheckout(sessionIdObj);
    })();


    return (
        <React.Fragment>
            <div className="container d-flex justify-content-center my-3">
                    <h3>Redirecting to the checkout page...</h3>
            </div>
        </React.Fragment>
    )


}