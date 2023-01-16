import React, { useContext, useEffect, useState } from 'react';
import LuggagesContext from "../contexts/LuggagesContext";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SingleCard from '../components/SingleCard';
import Row from 'react-bootstrap/Row';
import css from '../css/style.css';

export default function Luggages() {
    const luggagesContext = useContext(LuggagesContext);
    const luggages = luggagesContext.getLuggages() || [];

    const [query, setQuery] = useState({});
    const [searchOptions, setSearchOptions] = useState({});
    const [priceError, setPriceError] = useState(false);

    const [formFields, setFormFields] = useState({
        brand_id: '0',
        model: '',
        material_id: '0',
        types: '0',
        min_cost: '',
        max_cost: '',
    });

    useEffect(() => {
        (async () => {
            const searchOptions = await luggagesContext.getSearchOptions();
            await setSearchOptions(searchOptions);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            await luggagesContext.getLuggagesByQuery(query);
        })();
    }, [query]);

    const generateSelectOptions = (choices) => {
        if (choices) {
            return choices.map((choice, index) => {
                return (
                    <option key={index} value={choice[0]}>
                        {choice[1]}
                    </option>
                );
            });
        }
    };

    const updateFormFields = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    const searchLuggages = () => {
        if (
            formFields.min_cost !== '' &&
            formFields.max_cost !== '' &&
            Number(formFields.min_cost) > Number(formFields.max_cost)
        ) {
            setPriceError(true);
            return;
        } else {
            setPriceError(false);
        }

        const query = {
            ...formFields,
            min_cost: formFields.min_cost
                ? parseInt(formFields.min_cost * 100)
                : '',
            max_cost: formFields.max_cost
                ? parseInt(formFields.max_cost * 100)
                : ''
        };
        setQuery(query)
    }

    return (
        <React.Fragment>
            {/* <div class="banner-image w-100 vh-100 d-flex justify-content-center align-items-center">    
            </div> */}

            <div id='home-bg'>
                <video autoPlay loop muted id='home-video'>
                    <source src={require('../images/mi.mp4')} type='video/mp4' />
                </video>
                <Button className="call-to-action d-flex justify-content-center" href="#search-luggages">Shop All</Button>
            </div>
            <section className="search-section">
                <div className='row-search'>
                    <div className='column'>
                        <div className='accordian p3 mt-4'>
                            <Accordion defaultActiveKey="0" flush>
                                <Accordion.Item eventKey="0">

                                    <Accordion.Header>Search</Accordion.Header>
                                    <Accordion.Body>
                                        <Form.Group>
                                            <Form.Label>Model</Form.Label>
                                            <Form.Control type="text" placeholder="Search by model" name="model" value={formFields.model} onChange={updateFormFields}>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Brand</Form.Label>
                                            <Form.Select name='brand_id' value={formFields.brand_id} onChange={updateFormFields}>
                                                {generateSelectOptions(searchOptions.brands)}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Material</Form.Label>
                                            <Form.Select name='material_id' value={formFields.material_id} onChange={updateFormFields}>
                                                {generateSelectOptions(searchOptions.materials)}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Type of Traveller</Form.Label>
                                            <Form.Select name='types' value={formFields.types} onChange={updateFormFields}>
                                                {generateSelectOptions(searchOptions.types)}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Minimum Price</Form.Label>
                                            <Form.Control type="number" name="min_cost" min="0" value={formFields.min_cost} onChange={updateFormFields} />
                                            {priceError ? (
                                                <Form.Text className='error'>
                                                    Minimum price should be less than max price.
                                                </Form.Text>
                                            ) : ('')}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Maximum Price</Form.Label>
                                            <Form.Control type="number" name="max_cost" min="1" value={formFields.max_cost} onChange={updateFormFields} />
                                            {priceError ? (
                                                <Form.Text className='error'>
                                                    Maximum price should be more than min price.
                                                </Form.Text>
                                            ) : ('')}
                                        </Form.Group>
                                        <Button className="login-button mt-3 ml-3" onClick={searchLuggages}>Search</Button>
                                    </Accordion.Body>

                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                    <div className="column" id="search-luggages">
                    <div className="tabs">
                        <div className="single-tab">
                            <div className="container-fluid">
                                <div className="luggage-row">
                                    {luggages.length ? (
                                        luggages.map((luggage) => {
                                            return (
                                                <div key={luggage.id}>
                                                    <SingleCard luggage={luggage} />
                                                </div>
                                            );
                                        })
                                    ) : <div>
                                        <h5>No luggages found</h5>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>

                

            </section>




        </React.Fragment>

    )
}