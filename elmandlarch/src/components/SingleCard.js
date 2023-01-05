import React from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function SingleCard(props) {

    const imageUrl = props.luggage.image_url;
    const luggageName= `${props.luggage.brand.brand} ${props.luggage.model}`;
    const cost = props.luggage.cost;

return (
    <Card className="card-luggage" style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageUrl}/>
        <Card.Body>
            <Card.Title>{luggageName}</Card.Title>
            <Card.Text>${cost}</Card.Text>
            <Button className="mt-3" variant="primary" as={Link} to={`/luggages/${props.luggage.id}/more`}>See More</Button>
        </Card.Body>
    </Card>

)

}
