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
       logout: async (option = '') => {
        try {
            await axios.post(BASE_URL + '/users/logout', {
                refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
            });

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            if (option !== 'expire'){
                navigateTo('/')
            }
        } catch (e){
            console.log(e);
        }
       },
       refreshToken: async () => {
        try{
            const response = await axios.post(BASE_URL + '/users/refresh', {
                refreshToken: JSON.parse(localStorage.getItem('refreshToken'))
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });
            const accessToken = response.data.accessToken;
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
        }
        catch(e){
            console.log(e);
            if(JSON.parse(localStorage.getItem('refreshToken'))){
                await userContext.logout('expire');
            }
            navigateTo('/login');

            return false;
        }
       },
       addToCart: async (variantId, quantity) => {
        console.log("addtocart")
        if (!userContext.checkIfAuthenticated()){
            // console.log("if block")
            setRedirectTo(`/luggages/${variantId}/view`);
            navigateTo('/login');
        }
        else {
            console.log('else block')
            // console.log("check" , variantId)

                    await userContext.refreshToken();
                    const response = await axios.post(BASE_URL + `/cart/${variantId}/add`, {
                        quantity: parseInt(quantity)
                    }, {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                        }
                    });
                    const result = response.data;
                    if (result){

                    }
    
        }
       },

    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}
