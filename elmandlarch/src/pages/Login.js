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

    
};