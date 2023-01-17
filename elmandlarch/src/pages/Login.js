import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UserContext from '../contexts/UserContext';
import css from '../css/style.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from "react-toastify";

export default function Login(props) {
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

    const updateFormFields = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    // console.log("JSON", JSON.parse(localStorage.getItem("userData")).data.name);

    // const name = JSON.parse(localStorage.getItem("userData"))? JSON.parse(localStorage.getItem("userData")).data.name: null
    const login = async () => {
        const result = await userContext.login(formFields);
        console.log("result", result)
        if (!result) {
            console.log("error-set")
            setErrors(['error']);
        }
        else {
            toast.success("Welcome back. Travelling with you since 1898.");
        }
    }

    return (
        <React.Fragment>
            {userContext.checkIfAuthenticated() ? (
                <div className="login container-fluid p-3">
                    <h3>My Account</h3>
                    <Button onClick={orders} className="login-button mt-3">View my orders</Button>
                    <Button onClick={userContext.logout} className="login-button mt-1">Logout</Button>
                </div>) : (
                <div className='login container-fluid p-3'>
                    <h3>Sign In</h3>
                    <Form.Group >
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Email address"
                            className="mb-3"
                        >
                            <Form.Control className="login-detail"
                                type="text"
                                placeholder="name@example.com"
                                name="email"
                                value={formFields.email}
                                onChange={updateFormFields} />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group>
                        <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control className="login-detail"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={formFields.password}
                                onChange={updateFormFields}
                            />
                        </FloatingLabel>
                        {errors.includes('error') ? (
                            <Form.Text className='error'>
                                Please check your email address and password and try again.
                            </Form.Text>
                        ) : (
                            ''
                        )}
                    </Form.Group>
                    <div className="login-buttons">
                        <Button className="login-button mt-3" variant='primary' onClick={login}>SIGN IN</Button>
                    </div>
                    <h6 className="create-account mt-3">Create an account for faster checkout</h6>
                    <div className="login-button-create">
                        <Button className="login-register-button mt-3" variant='primary' onClick={register}>SIGN UP</Button>
                    </div>
                </div>
            )}

        </React.Fragment>

    )


};