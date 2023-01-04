import React, { useContext, useEffect, useState } from 'react';
import LuggagesContext from "../contexts/LuggagesContext";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

export default function Luggages() {
    const luggagesContext = useContext(LuggagesContext);
    const luggages = luggagesContext.getLuggages() || [];

    const [query, setQuery] = useState({});
    const [searchOptions, setSearchOptions] = useState({});

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
    }, [luggagesContext]);

    useEffect(() => {
        (async () => {
            await luggagesContext.getLuggagesByQuery(query);
        })();
    }, [query, luggagesContext]);

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

    return (
        <React.Fragment>
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
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </React.Fragment>

    )
}