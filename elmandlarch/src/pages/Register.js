import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import css from '../css/style.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
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
            <div className="register container-fluid p-3">
                <h1>Sign Up</h1>
                <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control className="login-detail"
                            type="text" name='name' placeholder='Type your name' value={formFields.name} onChange={updateFormFields}
                        />
                    </FloatingLabel>
                    {errors.includes('name') ? (
                        <Form.Text className='error'>
                            Name needs to be between 4 to 200 characters
                        </Form.Text>
                    ) : ('')}
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Username"
                        className="mb-3"
                    >
                        <Form.Control className="login-detail"
                            type="text" name='username' value={formFields.username} onChange={updateFormFields} placeholder='Type your username'
                        />
                    </FloatingLabel>
                    {errors.includes('username') ? (
                        <Form.Text className='error'>
                            Username needs to be between 4 to 200 characters
                        </Form.Text>
                    ) : ('')}
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                    >

                        <Form.Control className="login-detail"
                            type="password" name='password' value={formFields.password} onChange={updateFormFields} placeholder='Type your password'
                        />
                    </FloatingLabel>
                    {errors.includes('password') ? (
                        <Form.Text className='error'>
                            Password needs to be between 4 to 200 characters
                        </Form.Text>
                    ) : ('')}
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Confirm Password"
                        className="mb-3"
                    >
                        <Form.Control className="login-detail"
                            type="password" name='confirm_password' value={formFields.confirm_password} onChange={updateFormFields} placeholder='Type your password again'
                        />
                    </FloatingLabel>
                    {errors.includes('confirm_password') ? (
                        <Form.Text className='error'>
                            Password does not match. Type again.
                        </Form.Text>
                    ) : ('')}
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control className="login-detail"
                            type="text" name='email' value={formFields.email} onChange={updateFormFields} placeholder='Type your password again'
                        />
                    </FloatingLabel>
                    {errors.includes('email') ? (
                        <Form.Text className='error'>
                            Enter a valid email
                        </Form.Text>
                    ) : ('')}
                </Form.Group>
                <Form.Group>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Contact Number"
                        className="mb-3"
                    >
                        <Form.Control className="login-detail"
                            type="text" name='contact_number' value={formFields.contact_number} onChange={updateFormFields} placeholder='Type your password again'
                        />
                    </FloatingLabel>
                    {errors.includes('contact_number') ? (
                        <Form.Text className='error'>
                            Contact number must be less than 20 characters
                        </Form.Text>
                    ) : ('')}
                </Form.Group>

                <Button className="register-button" variant='primary' onClick={register}>
                    SIGN UP
                </Button>
            </div>
        </React.Fragment>

    )
};