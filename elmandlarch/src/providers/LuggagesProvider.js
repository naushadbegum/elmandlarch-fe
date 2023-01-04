import React, { useEffect, useState} from 'react';
import axios from 'axios';

import LuggagesContext from '../contexts/LuggagesContext';

const BASE_URL = "https://3000-naushadbegu-elmandlarch-adx4f1umngo.ws-us80.gitpod.io/api";

export default function LuggagesProvider(props) {
    const [luggages, setLuggages] = useState([]);
  
    const luggagesContext = {
        getLuggages: () => {
            return luggages;
        },
        getLuggagesByQuery: async (query) => {
            const response = await axios.get(BASE_URL + '/lugggages', {
                params: query
            });
            const luggages = response.data.data.luggages;
            setLuggages(luggages);
            return luggages;
        },
        getSearchOptions: async () => {
            const response = await axios.get(
                BASE_URL + '/luggages/search_options'
            );
            const searchOptions = response.data.data.options;
            return searchOptions;
        },
        getLuggageById: async (luggageId) => {
            const response = await axios.get(BASE_URL + '/luggages/' + luggageId);
            const luggage = response.data.data.luggage
            return luggage;
        }
    };

    return (
        <LuggagesContext.Provider value={luggagesContext}>
            {props.children}
        </LuggagesContext.Provider>
    );
    
}