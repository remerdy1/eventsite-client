import React from 'react';
import Event from "../event/event"
import "./events.css"

function Events(props){

    return (
        <div className="events">
            {props.eventList.map(event => <Event 
                name={event.name} 
                image={event.images.find(image => image.ratio === "16_9").url} 
                date={event.dates.start.localDate} 
                time={event.dates.start.localTime.substring(0, 5)} 
                key={props.eventList.indexOf(event)}
                url={event.url}
            />)}
        </div>

    )
}

export default Events