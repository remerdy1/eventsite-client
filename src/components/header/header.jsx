import React from 'react';
import "./header.css"

function Header(props){
    return (
        <header>
            <h1 className="header"><a href="/">Eventsite</a></h1>
            <p className="profile-text"><a href="/profile">My Profile</a></p>
        </header>
    )
}

export default Header;