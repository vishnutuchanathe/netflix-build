import React, {useState, useEffect} from 'react';
import './Nav.css';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchIcon from '@material-ui/icons/Search';

function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavBar = () => {
        if(window.scrollY > 100) {
            handleShow(true);
        }else{
            handleShow(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll",transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);
    return (
        <div className={`nav ${show && 'nav__black'}`}>
        <div className="nav__contents">
        <img className="nav__logo" src="logo.png" alt="" />
        <div className="nav__links">
        <p className="nav__link">Home</p>
        <p className="nav__link">TV shows</p>
        <p className="nav__link">Movies</p>
        <p className="nav__link">New & Popular</p>
        <p className="nav__link">My List</p>
        </div>
        <div className="icons">
        <div className="nav__content__right"><SearchIcon/></div>
        <p className="nav__content__right">CHILDREN</p>
        <div className="nav__content__right"><NotificationsIcon /></div>
        </div>
        <div className="nav__content__right"><img className="nav__avatar" src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="" /></div>
        </div>
        </div>
    )
}

export default Nav
