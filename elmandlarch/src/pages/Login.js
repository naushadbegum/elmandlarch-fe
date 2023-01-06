import React, {useContext, useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UserContext from '../contexts/UserContext';

export default function Login(props){
    const userContext = useContext(UserContext);

    const [errors, setErrors] = useState([]);
    const [formFields, setFormFields] = useState({
        email: '',
        password: ''
    })

    const updateFormFields =(event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    const login = async (event) => {
        const result = await userContext.login(formFields);
        if(!result){
            setErrors(['error']);
        }
        else {
            alert('Welcome to our shop')
        }
    }

    return (
        <React.Fragment>
            <div className= 'container-fluid'>
                <h1>Sign in</h1>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    type="text"
                    name="email"
                    value={formFields.email}
                    onChange={updateFormFields}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                    type="password"
                    name="password"
                    value={formFields.password}
                    onChange={updateFormFields}
                    />
                    {errors.includes('error')? (
                        <Form.Text className='error'>
                            Please check your email address and password and try again.
                        </Form.Text>
                    ):(
                        ''
                    )}
                </Form.Group>
                <Button variant='primary' onClick={login}>Sign In</Button>
            </div>
        </React.Fragment>

    )

    
};