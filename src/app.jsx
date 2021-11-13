import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
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
    const [username, setUsername] = useState("");
    const [favourites, setFavourites] = useState([]);


    // Check if user is already signed in
    useEffect(() =>{
        const loggedInUser = localStorage.getItem("user");
        
        if(loggedInUser){
            const user = JSON.parse(loggedInUser);
            setUsername(user.username);
            
            // Get favourites and store in state
            (async () =>{
                try{
                    const res = await axios.get(`http://localhost:8050/${user.username}/profile`,{
                        headers:{ 
                            Authorization: `Bearer ${user.token}`
                        }
                    })
    
                    setFavourites(res.data.favourites);
                }catch(e){
                    localStorage.clear();
                    window.location = "/login";
                }
            })();
        }

    }, [username]);

    // Make request to restcountries
    const fetchCountries = async () =>{
        // Limited to European countries 
        const countries = await (await fetch("https://restcountries.com/v3.1/subregion/europe")).json();
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

    // Check if event is in favourites 
    const isFavourite = event =>{ 
        for(let i = 0; i < favourites.length; i++){
            if(event.url === favourites[i].url) return true;
        }
        
        return false;
    };

    return (
        <div>     
            <Router>             
                <Header username={username} setUsername={setUsername}/>
                <Switch>
                    <Route path="/" exact>
                        <Search fetchCountries={fetchCountries} handleSubmit={handleSubmit}/>
                        <Events eventList={events} isFavourite={isFavourite} favourites={favourites}/>
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/:username/profile">
                        <MyProfile username={username} isFavourite={isFavourite} favourites={favourites}/>
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