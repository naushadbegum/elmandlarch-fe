import React from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// import { useNavigate } from "react-router-dom";

export default function SingleCard(props) {

    const imageUrl = props.luggage.image_url;
    const luggageName= `${props.luggage.brand.brand} ${props.luggage.model}`;
    const newCost = props.luggage.cost;
    const price = newCost / 100;

    // const navigate = useNavigate();

    // const detail = () => {
    //     navigate("/detail")
    // }

return (
    <Card className="card-luggage" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageUrl}/>
        <Card.Body>
            <Card.Title>{luggageName}</Card.Title>
            <Card.Text>${price}</Card.Text>
            {/* <Button className="mt-3" variant="primary" onClick={detail}>See More</Button> */}
            <Button className="mt-3" variant="primary" as={Link} to={`/luggages/${props.luggage.id}/more`}>See more</Button>
        </Card.Body>
    </Card>

)

}
