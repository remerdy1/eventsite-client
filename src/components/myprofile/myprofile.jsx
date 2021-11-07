import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "./myprofile.css";
const axios = require("axios");

function MyProfile(props){
    const [profileData, setProfileData] = useState({});
    const {username} = useParams();

    // Fetch data about once the page has rendered
    useEffect(() => {
        // GET data about the user to display on profile 
        const fetchData = async () =>{
            try{
                const token = JSON.parse(localStorage.user).token;
                
                // get data about the profile being viewed
                const res = await axios.get(`http://localhost:8050/${username}/profile`, {
                    headers: {"authorization": "Bearer "+token}
                });
    
                setProfileData(res.data);
            }catch(e){
                //log user out
                localStorage.clear();
                // redirect to login page
                window.location = "/login"
            }
        }

        fetchData();
    }, [username])
    
    return (
        <div>
            <p>{profileData.fullName}</p>
            <p>{profileData.username}</p>
            <p>[Insert favourites here]</p>
        </div>
    )
}

export default MyProfile;