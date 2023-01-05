import React from "react";
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function SingleCard(props) {

    const imageUrl = props.luggage.image_url;
    const luggageName= `${props.luggage.brand.brand} ${props.luggage.model}`;
    const cost = props.luggage.cost;

return (
    <Card className="card-luggage">
        <Card.Img variant="top" src={imageUrl}/>
        <Card.Body>
            <Card.Title>{luggageName}</Card.Title>
            <Card.Text>${cost}</Card.Text>
            
        </Card.Body>
    </Card>

)

}
