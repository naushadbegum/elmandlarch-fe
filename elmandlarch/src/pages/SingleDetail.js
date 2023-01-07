import React, {useContext, useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import LuggagesContext from '../contexts/LuggagesContext';
import UserContext from '../contexts/UserContext';

export default function SingleDetail(props){

    const {luggageId} = useParams();
    const luggagesContext = useContext(LuggagesContext);
    const userContext = useContext(UserContext);

    const [luggage, setLuggage] = useState({});
    const [variant, setVariant] = useState({});
    const [formFields, setFormFields] = useState({});


    useEffect(()=> {
        if(luggage.variants){
            const variants = luggage.variants.filter((variant)=>{
                if(parseInt(variant.color_id)=== parseInt(formFields.color_id) && 
                   parseInt(variant.dimension_id)===parseInt(formFields.dimension_id)
                   ){
                    return true
                   }
                   return false
            });
            if(variants.length){
                setVariant(variants[0]);
            }else {
                console.log("hi")
            }
        }
    })

	const updateFormFields = (event) => {
		// Check that quantity does not exceed stock
		if (
			event.target.name === 'quantity' &&
			parseInt(event.target.value) > parseInt(variant.stock)
		) {
			setFormFields({
				...formFields,
				[event.target.name]: variant.stock
			});
			return;
		}
		else if (event.target.name === 'quantity' &&
			parseInt(event.target.value) <= 0) {
			setFormFields({
				...formFields,
				[event.target.name]: 1
			});
			return;
		}

		setFormFields({
			...formFields,
			[event.target.name]: event.target.value
		});
	};

    const addCart = async () => {
        console.log(variant.id);
        await userContext.addToCart(variant.id, formFields.quantity)
    }

    return (
        <React.Fragment>
            <Form.Group>
            <Form.Label>Select the color of luggage</Form.Label>
            <Form.Select name='dimension_id' value={formFields.color_id} onChange={updateFormFields}>
                <option value="1">Brown</option>
                <option value="2">Blue</option>
            </Form.Select>
        </Form.Group>
        <Form.Group>
            <Form.Label>Select the size of luggage</Form.Label>
            <Form.Select name='dimension_id' value={formFields.dimension_id} onChange={updateFormFields}>
                <option value="1">Small</option>
                <option value="2">Medium</option>
                <option value="3">Large</option>
            </Form.Select>
        </Form.Group>
        <Button variant='primary' onClick={addCart}>Add To Cart</Button>
        </React.Fragment>
    )
}