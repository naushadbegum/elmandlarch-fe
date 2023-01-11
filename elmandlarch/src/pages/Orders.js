import React, {useEffect, useContext, useState} from 'react';

import UserContext from '../contexts/UserContext';

export default function Orders(props) {
    const userContext = useContext(UserContext);

    const [orders, setOrders] = useContext(UserContext);

    useEffect(()=> {
        (async () => {
            const valid = await userContext.refreshToken();
            if(!valid){
                return;
            }
            const orders = await userContext.getOrders();
            
            setOrders(orders);
    })();
    }, []);

    const showOrders = () => {
        return (
            <React.Fragment>
                <th>ID</th>
                <tbody>
                    {orders.length ? (orders.map((order) => {
                        return (
                            <td>{order.id}</td>
                        )
                    })): ('')}
                </tbody>
            </React.Fragment>

        )
    }

    return (
        <React.Fragment>
            <h1>Orders</h1>
            <div>
                {showOrders()}
            </div>
        </React.Fragment>
    )
}