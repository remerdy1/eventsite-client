import React from 'react';
import "./event.css";
const axios = require("axios");

// TODO: Loading...
// TODO: CANCELLED instead of Buy Tickets
// TODO: Make buy button responsive 

function Event(props){
    const addToFavourites = async e =>{
        // event data
        const {name, date, time, image} = props;
        // user data
        const {username, token} = JSON.parse(localStorage.user);

        // post event data to backend
        try{
            const res = await axios.post(`http://localhost:8050/${username}/profile/favourites`, {name, date, time, image}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
        }catch(e){
            if(e.response.status === 400){
                alert(e.response.data);
            } 

            else if(e.response.status === 403){
                localStorage.clear();
                window.location = "/login";
            }
        }
    }

    return (
        <div className="event-card">
            <img src={props.image} alt={props.name} className="event-image"/>
            <h3>{props.name}</h3>
            <p className="date">{props.date} {props.time}</p>
            <button className="buy-button" onClick={() => window.open(props.url)}>Buy Tickets</button>
            <button onClick={addToFavourites}>Favourite</button>
        </div> 
    )
}

export default Event