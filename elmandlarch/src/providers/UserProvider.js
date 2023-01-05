import React from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
// import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = "https://3000-naushadbegu-elmandlarch-adx4f1umngo.ws-us81.gitpod.io/api";

export default function UserProvider(props){


    // const [userData, setUserData] = useState({
    //     'name': '',
    //     'email': '',
    //     'password': '',
    //     'contact_number': '',
    //     'username': ''
    // })
    const userContext = {
        // userData, setUserData,
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
        }
    }

    return (
        <UserContext.Provider value={userContext}>
            {props.children}
        </UserContext.Provider>
    )
}
