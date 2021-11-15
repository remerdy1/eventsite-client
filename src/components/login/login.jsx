import React from 'react';
import "./login.css";

const axios = require("axios");

function Login(props){
    const onSubmit = async e =>{
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        e.target.username.value = null;
        e.target.password.value = null;

        try{
            const res = await axios.post(process.env.REACT_APP_API+"login", {username, password,});
            // Store JWT 
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location = "/";
            
        }catch(e){
            alert("Unable to find user with those credentials.");
        }
    }

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <input placeholder="Username" name="username" className="login-input" required/>
            <input placeholder="Password" name="password" className="login-input" type="password" required/>
            <button className="login-button">Log In</button>
        </form>
    )
}

export default Login;