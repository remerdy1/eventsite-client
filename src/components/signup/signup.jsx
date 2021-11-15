import React from 'react';

const axios = require("axios");

function Signup(){
    const onSubmit = async e =>{
        e.preventDefault();
        const fullName = e.target.fullName.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        
        try{
            // Clear form
            e.target.username.value = null;
            e.target.fullName.value = null;
            e.target.password.value = null;
            e.target.confirmPassword.value = null;
            
            // Send data
            const res = await axios.post("https://"+process.env.REACT_APP_API+"signup", {fullName, username, password, confirmPassword});
            // save token
            localStorage.setItem("user", JSON.stringify(res.data));
            // redirect
            window.location = "/";
        }catch(e){
            alert(e.response.data);
        }
        
    }

    return (
        <form className="login-form" onSubmit={onSubmit}>
            <input placeholder="Full Name" name="fullName" className="login-input" required/>
            <input placeholder="Username" name="username" className="login-input" required/>
            <input placeholder="Password" name="password" className="login-input" type="password" required/>
            <input placeholder="Confirm Password" name="confirmPassword" className="login-input" type="password" required/>
            <button className="login-button">Sign Up</button>
        </form>
    )
}

export default Signup;