import React, {useState} from 'react';

import Header from "./components/header/header"
import Search from "./components/search/search"
import Events from "./components/events/events"

const axios = require("axios");

function App(){
    const [events, setEvents] = useState([]);

    // Make request to restcountries
    const fetchCountries = async () =>{
        const countries = await (await fetch("https://restcountries.eu/rest/v2/all")).json();
        return countries
    }

    // Get list of events 
    const handleSubmit = async e =>{
        e.preventDefault();
    
        const city = e.target.city.value;
        const country = e.target.country.value;
        
        try{
            const response = await axios.post("http://localhost:8050/events", {
                city,
                country,
            })
                
            setEvents(response.data);
        }catch(e){
            //TODO Handle errors
            setEvents(["No results found"])
        }
    }

    return (
        <div>         
            <Header />
            <Search fetchCountries={fetchCountries} handleSubmit={handleSubmit}/>
            <Events eventList={events}/>
        </div>
    )
}

export default App;