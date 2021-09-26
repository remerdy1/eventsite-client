import React from 'react';
import "./login.css";
function Login(){
    return (
        <form className="login-form">
            <input placeholder="Username" name="username" className="login-input" required/>
            <input placeholder="Password" name="password" className="login-input" type="password" required/>
            <button className="login-button">Log In</button>
        </form>
    )
}

export default Login;