import React from 'react';
import "./login.css";

const axios = require("axios");

function Login(){
    const onSubmit = async e =>{
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        e.target.username.value = null;
        e.target.password.value = null;

        await axios.post("http://localhost:8050/login", {username, password,});
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