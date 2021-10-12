import React from 'react';
import "./event.css";

// TODO: Loading...
// TODO: CANCELLED instead of Buy Tickets
function Event(props){
    return (
        <div className="event-card">
            <img src={props.image} alt="name" className="event-image"/>
            <h3>{props.name}</h3>
            <p className="date">{props.date} {props.time}</p>
            <button className="buy-button" onClick={() => window.open(props.url)}>Buy Tickets</button>
        </div> 
    )
}

export default Event