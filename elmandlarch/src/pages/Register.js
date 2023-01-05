import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UserContext from '../contexts/UserContext';

export default function Register(props) {
    const userContext = useContext(UserContext);

    const [errors, setErrors] = useState([]);
    const [formFields, setFormFields] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        contact_number: ''
    })

    const updateFormFields = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    const validateFormFields = async () => {
        const errors = [];

        if (formFields.name.length < 4 || formFields.name.length > 200) {
            errors.push('name');
        }

        if (
            formFields.username.length < 4 || formFields.username.length > 200) {
            errors.push('username');
        }

        if (!formFields.email.includes("@") || !formFields.email.includes(".")) {
            errors.push('email');
        }

        if (formFields.password.length < 4 || formFields.password.length > 200) {
            errors.push('password');
        }

        if (formFields.confirm_password !== formFields.password) {
            errors.push('confirm_password');
        }

        if (formFields.contact_number.length < 4 || formFields.contact_number.length > 20) {
            errors.push('contact_number');
        }

        setErrors(errors);
        return errors;
    };

    const register = async function () {
        const errors = await validateFormFields();
        if (errors.length) {
            return;
        }
        const userData = {
            name: formFields.name,
            username: formFields.username,
            email: formFields.email,
            password: formFields.password,
            contact_number: formFields.contact_number
        };

        await userContext.register(userData);
    };

    return (
        <React.Fragment>
            <h1>Register</h1>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text" name='name' value={formFields.name} onChange={updateFormFields} placeholder='Type your name'
                />
                {errors.includes('name') ? (
                    <Form.Text className='error'>
                        Name needs to be between 4 to 200 characters
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text" name='username' value={formFields.username} onChange={updateFormFields} placeholder='Type your username'
                />
                {errors.includes('username') ? (
                    <Form.Text className='error'>
                        Username needs to be between 4 to 200 characters
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password" name='password' value={formFields.password} onChange={updateFormFields} placeholder='Type your password'
                />
                {errors.includes('password') ? (
                    <Form.Text className='error'>
                        Password needs to be between 4 to 200 characters
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password" name='confirm_password' value={formFields.confirm_password} onChange={updateFormFields} placeholder='Type your password again'
                />
                {errors.includes('confirm_password') ? (
                    <Form.Text className='error'>
                        Password does not match. Type again.
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text" name='email' value={formFields.email} onChange={updateFormFields} placeholder='Type your password again'
                />
                {errors.includes('email') ? (
                    <Form.Text className='error'>
                        Enter a valid email
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                    type="text" name='contact_number' value={formFields.contact_number} onChange={updateFormFields} placeholder='Type your password again'
                />
                {errors.includes('contact_number') ? (
                    <Form.Text className='error'>
                        Contact number must be less than 20 characters
                    </Form.Text>
                ) : ('')}
            </Form.Group>
            <Button variant='primary' onClick={register}>
                Sign Up
            </Button>

        </React.Fragment>

    )
};