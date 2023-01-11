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

        const stripeResult = await userContext.checkout();
        if (!stripeResult) {
            navigateTo('/')
            return;
        }

        if (stripeResult){
            sessionIdObj = {sessionId: stripeResult.sessionId };
            publishableKey = stripeResult.publishableKey
        }

        const stripe = await loadStripe(publishableKey);
        stripe.redirectToCheckout(sessionIdObj);
    })();


    return (
        <React.Fragment>
            <div>
                <h3>Redirecting to the checkout page...</h3>
            </div>
        </React.Fragment>
    )


}