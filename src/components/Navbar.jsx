import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = props => (
    <div>
        <div className="top-bar">
            <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                    <li className="menu-text">Site Title</li>
                            <li><Link to={props.routes.titleSearch}>Titles</Link></li>
                            <li><Link to={props.routes.directorSearch}>Directors</Link></li>
                            <li><Link to={props.routes.actorSearch}>Actors</Link></li>
                            <li><Link to={props.routes.idSearch}>IMBD ID</Link></li>
                </ul>
            </div>
        </div>
    </div>
);

Navbar.propTypes = {
    routes: PropTypes.object,
};
Navbar.defaultProps = {};

export default Navbar;
