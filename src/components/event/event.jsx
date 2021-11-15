import React, {useState, useEffect} from 'react';
import "./event.css";
const axios = require("axios");

function Event(props){
    const [favourite, setFavourite] = useState(false);
    
    useEffect(() => {
        if(props.favourite === true) setFavourite(true);
    }, [props.favourite]);

    // Add to favourites
    const addToFavourites = async e =>{
        // event data
        const {name, date, time, image, url} = props;
        // user data
        if(!localStorage.user) window.location = "/login";

        const {username, token} = JSON.parse(localStorage.user);

        // post event data to backend
        try{
            await axios.post(`https://remys-eventsite.herokuapp.com/${username}/profile/favourites`, {name, date, time, image, url}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            setFavourite(true);
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

    // Remove from favourites
    const removeFromFavourites = async e =>{
        // event data
        const {name, date, time, image, url} = props;
        // user data
        const {username, token} = JSON.parse(localStorage.user);

        try{
            await axios.delete(`https://remys-eventsite.herokuapp.com/${username}/profile/favourites`, {
                data:{name, date, time, image, url},
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            setFavourite(false);
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
            <button onClick={favourite ? removeFromFavourites : addToFavourites}>{favourite ? "Remove" : "Favourite"}</button>
        </div> 
    )
}

export default Event
