import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "./myprofile.css";
const axios = require("axios");

function MyProfile(){
    const {username} = useParams();
    const [userData, setUserData] = useState({});
    //TODO get favourites from database
    //TODO display on page
    //TODO if no events -> "This user has not favourited any events"
    //TODO some JWT token bullshit idk yet

    // GET data about the user to display on profile 
    const fetchData = async () =>{
        const test = await axios.get(`http://localhost:8050/${username}/profile`);
        console.log(test);
        return test;
    }
    
    // Fetch data about once the page has rendered
    useEffect(async () => {
        setUserData((await fetchData()).data);
    }, [])

    return (
        <div>
            <p>{userData.fullName}</p>
            <p>{userData.username}</p>
            <p>[insert favourites here]</p>
        </div>
    )
}

export default MyProfile;