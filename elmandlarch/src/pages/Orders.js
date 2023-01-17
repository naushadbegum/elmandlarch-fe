import React, {useEffect, useContext, useState} from 'react';

import UserContext from '../contexts/UserContext';

export default function Orders(props) {
    const userContext = useContext(UserContext);

    const [orders, setOrders] = useState([]);

    useEffect(()=> {
        (async () => {
            const valid = await userContext.refreshToken();
            if(!valid){
                return;
            }
            const orders = await userContext.orders();
            console.log("orders", orders);
            
            setOrders(orders);
    })();
    }, []);

    const showOrders = () => {
        return (
            <React.Fragment>
                 <div className="container d-flex justify-content-center my-3">
                    <h3>My Orders</h3>
                </div>

                <div className="px-5">
                    <table className='table' style={{ backgroundColor: "rgba(255, 255, 255)" }}>
                <thead>
                <tr>
                <th>ID</th>
                <th>Total Cost</th>
                <th>Payment Type</th>
                <th>Shipping Address</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Status</th>
                </tr>
                </thead>
                
                <tbody className="normal-font">
                    {orders.length ? (orders.map((order) => {
                        return (
                            <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{(order.total_cost /100)}</td>
                            <td>{order.payment_type}</td>
                            <td>{order.shipping_address_line1} <br/> {order.shipping_address_line2} <br/> {order.shipping_postal_code}</td>
                            <td>{new Date(order.order_date.slice(0,-1)).toDateString()}</td>
                            <td>{new Date(order.delivery_date.slice(0,-1)).toDateString()}</td>
                            <td>{order.orderStatus.order_status}</td>
                            </tr>
                        )
                    })): ('')}
                </tbody>
                </table>
                </div>
            </React.Fragment>

        )
    }

    return (
        <React.Fragment>
            <div>
                {showOrders()}
            </div>
        </React.Fragment>
    )
}