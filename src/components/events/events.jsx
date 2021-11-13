import React from 'react';
import Event from "../event/event"
import "./events.css"

function Events(props){

    if(props.eventList[0] !== "No results found"){
        return (  
            <div className="events">
                <div className="results">
                    {props.eventList.map(event => <Event 
                        name={event.name} 
                        image={event.images.find(image => image.ratio === "16_9").url} 
                        date={event.dates.start.localDate} 
                        time={event.dates.start.localTime ? event.dates.start.localTime.substring(0, 5) : "TBA"} 
                        key={props.eventList.indexOf(event)}
                        url={event.url}
                        favourite={props.isFavourite(event)}
                    />)}
                </div>
            </div>
        )
    }else{
        return <h3>No results found</h3>
    }
}

export default Events