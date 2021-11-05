import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import "./myprofile.css";
const axios = require("axios");

function MyProfile(props){
    const {username} = useParams();
    //? move to app.jsx?
    //const [userData, setUserData] = useState({});
    
    // Fetch data about once the page has rendered
    useEffect(() => {
        // GET data about the user to display on profile 
        const fetchData = async () =>{
            try{
                const res = await axios.get(`http://localhost:8050/${username}/profile`, {
                    headers: {"authorization": "Bearer "+localStorage.token}
                });
    
                props.setUserData(res.data);
            }catch(e){
                // redirect to login page
                window.location = "/login"
            }
        }

        fetchData();
    }, [username, props])
    
    return (
        <div>
            <p>{props.userData.fullName}</p>
            <p>{props.userData.username}</p>
            <p>[Insert favourites here]</p>
        </div>
    )
}

export default MyProfile;