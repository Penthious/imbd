import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NotFoundPage = props => (
    <div>
        <h4>
            404 Page Not Found
        </h4>
        <Link to={props.landing}> Go back to homepage </Link>
    </div>
);

NotFoundPage.propTypes = {
    landing: PropTypes.string,
};
export default NotFoundPage;
