import React, {useState} from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
// import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "https://3000-naushadbegu-elmandlarch-adx4f1umngo.ws-us82.gitpod.io/api";

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

                if (response.data.error === "Invalid email and/or password"){
                    return false
                }else {
                    const accessToken = response.data.accessToken;
                    const refreshToken= response.data.refreshToken;
                    localStorage.setItem('accessToken', JSON.stringify(accessToken));
                    localStorage.setItem('refreshToken', JSON.stringify(refreshToken));        
                }

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
            await axios.post( BASE_URL + '/users/logout', {
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
            console.log("response", response.data);
            const accessToken = response.data.accessToken;
            localStorage.setItem('accessToken', JSON.stringify(accessToken));
            return true;
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
       addToCart: async (luggageId, variantId, quantity) => {
        if (!userContext.checkIfAuthenticated()){

            setRedirectTo(`/luggages/${luggageId}/more`);
            navigateTo('/login');
        }
        else {
            console.log('else block')

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
       getCart: async () => {
        const response = await axios.get(BASE_URL + '/cart', {
          headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
          }
        });
        const cart = response.data.cartItems;
        return cart
     },
        deleteCartItem: async (variantId) => {
            const response = await axios.delete(BASE_URL + `/cart/${variantId}/remove`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });

            return response
        },
        updateCart: async (variantId, quantity)=>{
            const response = await axios.put(BASE_URL + `/cart/${variantId}/update`, {
                quantity: parseInt(quantity)
            }, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });
            return response
        },
        checkout: async () => {
            const cartItems = await userContext.getCart();

            if(!cartItems || !cartItems.length){
                return false
            }

            const response = await axios.get(BASE_URL + '/checkout',{
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });

            console.log("checkout", response.data);
            return response.data
        },
        orders: async () => {
            const response = await axios.get(BASE_URL + '/orders', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                }
            });
            const orders = response.data.orders;
            return orders;
        }

    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}