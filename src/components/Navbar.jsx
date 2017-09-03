import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = props => (
    <div>
        <ul>
            <li><Link to={props.routes.titleSearch}>Titles</Link></li>
            <li><Link to={props.routes.directorSearch}>Directors</Link></li>
            <li><Link to={props.routes.actorSearch}>Actors</Link></li>
            <li><Link to={props.routes.votesSearch}>Votes</Link></li>
        </ul>
    </div>
);

Navbar.propTypes = {
    routes: PropTypes.object,
};
Navbar.defaultProps = {};

export default Navbar;
