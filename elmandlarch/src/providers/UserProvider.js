import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
// import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "https://3000-naushadbegu-elmandlarch-adx4f1umngo.ws-us81.gitpod.io/api";

export default function UserProvider(props){

const [redirectTo, setRedirectTo] = useState('');

const navigateTo = useNavigate();

    const userContext = {


        checkIfAuthenticated: () => {
            if (JSON.parse(localStorage.getItem('accessToken')) && JSON.parse(localStorage.getItem('refreshToken'))){
                return true;
            }
            return false;
        },
        register: async (userData) => {
            const response = await axios.post(BASE_URL + '/users/register', userData);
            if(response){
                // toast.success('Account registered successfully!', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // });
            }
        },
        login: async (userData) => {
            try{
            const response = await axios.post(BASE_URL + '/users/login', userData);
            // console.log(response.data.accessToken);

            const accessToken = response.data.accessToken;
            // console.log(response.data.accessToken);
            const refreshToken= response.data.refreshToken;
            // console.log(refreshToken);
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

            if(redirectTo){
                navigateTo(redirectTo);
                setRedirectTo('');
            }
            else {navigateTo('/')}
            return true;
        } catch (error){
            console.log(error)
        }
       },
       
    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}
