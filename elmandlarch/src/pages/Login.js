import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
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

    const navigate = useNavigate();

    const register = () => {
        navigate("/register")
    }

    const orders = () => {
        navigate("/orders")
    }

    const updateFormFields =(event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    const login = async () => {
        const result = await userContext.login(formFields);
        console.log("result", result)
        if(!result){
            setErrors(['error']);
        }
        else {
            alert('Welcome to our shop')
        }
    }

    return (
        <React.Fragment>
            {userContext.checkIfAuthenticated() ? (
            <div> <h5>Customer Name: </h5>
                <Button onClick={orders}>View my orders</Button>
                <Button onClick={userContext.logout}>Logout</Button>
            </div>):(
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
                <h5>Do not have an account? Register now!</h5>
                <Button variant='primary' onClick={register}>Register</Button>
            </div>
            )} 

        </React.Fragment>

    )

    
};