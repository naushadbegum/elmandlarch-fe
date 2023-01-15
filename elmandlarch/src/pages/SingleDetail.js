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
	const [error, setError] = useState(false);
    // const [searchOptions, setSearchOptions] = useState({});

	useEffect(() => {
        (async () => {

			const luggage = await luggagesContext.getLuggageById(luggageId);
            const colors = [];
            const dimensions = [];


            const selected = {
                colors: {},
                dimensions: {},

            };

            for (let variant of luggage.variants) {
                const color = [variant.color_id, variant.color.color];
				console.log("variant", variant.color_id,variant.color.color)
                const dimension = [variant.dimension_id, variant.dimension.dimension];
			
                if (!selected.colors[color[0]]) {
                    colors.push(color);
                    selected.colors[color[0]] = color[1];
                }
                if (!selected.dimensions[dimensions[0]]) {
                    dimensions.push(dimension);
                    selected.dimensions[dimension[0]] = dimension[1];
                }
                
            }


			console.log("hello", luggage.variants[0].dimension.id);
            
            await setVariant(luggage.variants[0]);
            await setLuggage(luggage);
			console.log(luggage.variants[0]);
            await setFormFields({
                color_id: luggage.variants[0].color.id,
                dimension_id: luggage.variants[0].dimension.id,
                quantity: 1
            });
            
        })();
    }, [luggageId]);

	useEffect(() => {
        if (luggage.variants) {

			const variants = luggage.variants.filter((variant) => {
                if (
                    parseInt(variant.color_id) === parseInt(formFields.color_id) &&
                    parseInt(variant.dimension_id) === parseInt(formFields.dimension_id)
                ) {
                    return true;
                }
                return false;
            });

			if (variants.length) {
                setVariant(variants[0]); 
                setError(false); 
                // setSearchOptions(getAvailableOptions()); 
            }

            else {
                setError(true);
            }
        }
    }, [formFields]);

	useEffect(() => {
        if (error) {
            
            let variants = luggage.variants.filter((variant) => {
                return (
                    parseInt(variant.color_id) === parseInt(formFields.color_id) && 
                    parseInt(variant.dimension_id) === parseInt(formFields.color_id)
                );
            });

            if (variants.length) {
                setFormFields({
                    ...formFields,
                    color_id: variants[0].color_id,
                    dimension_id: variants[0].dimension_id,
                });
                return;
            }

            variants = luggage.variants.filter((variant) => {
                return (
                    parseInt(variant.color_id) === parseInt(formFields.color_id)
                );
            })

            if(variants.length){
                setFormFields({
                    ...formFields,
                    color_id: variants[0].color_id,
                    dimension_id: variants[0].dimension_id,
                });
                return;
            }
        }
    }, [error]);


    const updateFormFields =(event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };


    const addCart = async () => {
        console.log(variant.id);
        await userContext.addToCart(luggageId, variant.id, formFields.quantity)
    }

    return (
        <React.Fragment>
			
			<div className='container-fluid variant-img-box p-lg-5'>
			<h2 className='product-header pt-4'>
										{Object.keys(luggage).length>0 && luggage?.brand.brand}
									
									</h2>
                                        <img
                                            className='variant-img'
                                            src={variant.image_url}
                                            alt='Luggage variant photo'
                                        /> 
						           </div>
								   <h5>Select variant:</h5>
            <Form.Group>
            <Form.Label>Select the color of luggage</Form.Label>
            <Form.Select name='color_id' value={formFields.color_id} onChange={updateFormFields}>
                <option value="2">Brown</option>
                <option value="3">Blue</option>
                <option value="4">Green</option>
                
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