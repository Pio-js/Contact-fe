import {NavLink} from 'react-router-dom';
import './Navbar.css';

export default function (props) {
    return (
        <nav>
            <NavLink
                exact
                className = "nav-item" 
                activeClassName="active"
                to = "/"
            >Home</NavLink>

            <NavLink
                exact
                className = "nav-item"
                activeClassName="active" 
                to = "/contacts"
            >Contacts</NavLink>

            <NavLink
                exact
                className = "nav-item"
                activeClassName="active" 
                to = "/getcontact"
            >Get Contact</NavLink>
        </nav>
    );
}