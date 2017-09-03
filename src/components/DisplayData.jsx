import React, { Component } from "react";
import PropTypes from "prop-types";

class DisplayData extends Component {
    render() {
        return (
            <div>
                {this.props.data.map(movie => (
                    <div>
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
        );
    }
}

DisplayData.propTypes = {};
DisplayData.defaultProps = {
    data: [],
};

export default DisplayData;
