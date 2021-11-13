import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Event from "../event/event";
import "./myprofile.css";
const axios = require("axios");

function MyProfile(props){
    const [profileData, setProfileData] = useState({});
    const {username} = useParams();

    // Fetch data about once the page has rendered
    useEffect(() => { 
        // Fetch data about profile you're viewing 
        (async () =>{
            try{
                const token = JSON.parse(localStorage.user).token;
                
                // get data about the profile being viewed
                const res = await axios.get(`http://localhost:8050/${username}/profile`, {
                    headers: {"authorization": "Bearer "+token}
                });
                
                setProfileData(res.data);
            }catch(e){
                if(e.response.status === 403){
                    //log user out
                    localStorage.clear();
                    // redirect to login page
                    window.location = "/login"
                }
                else window.location = "/notfound";
            }
        })()
    }, [username])
    
    return (
        <div>
            <div className="name-div">
                <h1 className="full-name">{profileData.fullName}</h1>
                <h3 className="username">@{profileData.username}</h3>
            </div>

            <h2 className="favourites-header">Favourites({profileData.favourites && profileData.favourites.length}/4):</h2>
            <div className="favourites">
                {profileData.favourites && profileData.favourites.map(event => <Event name={event.name} time={event.time} date={event.date} image={event.image} url={event.url} favourite={props.isFavourite(event)} key={profileData.favourites.indexOf(event)}/>)}
            </div>
        </div>
    )
}

export default MyProfile;