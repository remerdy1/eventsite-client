import React, {useState} from 'react';
import {BrowserRouter as Router, Switch,Route, Link} from "react-router-dom";
import "./style.css"

// Components
import Header from "./components/header/header";
import Search from "./components/search/search";
import Events from "./components/events/events";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import MyProfile from "./components/myprofile/myprofile"

const axios = require("axios");

function App(){
    const [events, setEvents] = useState([]);

    // Make request to restcountries
    const fetchCountries = async () =>{
        // Limited to European countries 
        const countries = await (await fetch("https://restcountries.com/v2/continent/europe")).json();
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
            setEvents(["No results found"])
        }
    }

    return (
        <div>     
            <Router>             
                <Header />
                <Switch>
                    <Route path="/" exact>
                        <Search fetchCountries={fetchCountries} handleSubmit={handleSubmit}/>
                        <Events eventList={events}/>
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/:username/profile">
                        <MyProfile />
                    </Route>
                    <Route>
                        <h1 style={{textAlign: "center"}}>Page not found</h1>
                    </Route>
                </Switch>
            </Router>   
        </div>
    )
}

export default App;