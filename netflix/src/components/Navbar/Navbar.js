import React, { useEffect, useState } from 'react';
import logo from "./img/Netflix_logo.png";
import profile_logo from "./img/profile-logo.png";
import "./nav.scss";

function Navbar() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 100){
                handleShow(true);
            }else {
                handleShow(false);
            };
        });
            return () => {
                window.removeEventListener('scroll');
            }
    }, []);

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" src={logo} alt="Netflix Logo"/>
            <img className="nav__avatar" src={profile_logo} alt="Netflix Logo"/>
        </div>
    );
}

export default Navbar;