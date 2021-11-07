import React from 'react';
import "./header.css"

function Header(props){

    const logout = () =>{
        props.setUsername("");
        localStorage.clear();
        window.location = "/login";
    }

    return (
        <header>
            <h1 className="header"><a href="/">Eventsite</a></h1>

        {
            // if user signed in show logout & my profile button
            (props.username && 
            <div className="text-div">
                <p className="profile-text"><a href={`/${props.username}/profile`}>My Profile</a></p>
                <p className="profile-text" onClick={logout}>Logout</p>
            </div>)
            // else show login button
            ||
            <div className="text-div">
                <p className="profile-text"><a href={'/login'}>Login</a></p>
                <p className="profile-text"><a href={'/signup'}>Sign up</a></p>
            </div>
        }
        </header>
    )
}

export default Header;