import React from 'react';
import logo from "./img/Netflix_logo.png";
import profile_logo from "./img/profile-logo.png";
import "./nav.css";

function Navbar() {
    return (
        <div className="nav">
            <img className="nav__logo" src={logo} alt="Netflix Logo"/>
            <img className="nav__avatar" src={profile_logo} alt="Netflix Logo"/>
        </div>
    );
}

export default Navbar;