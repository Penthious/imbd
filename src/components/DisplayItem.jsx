import React, { Component } from "react";
import PropTypes from "prop-types";

class DisplayItem extends Component {
    render() {
        const { rating, description, title, poster, url, image } = this.props.location.state;
        return (
            <div>

                {rating ? <p>{rating}</p> : null}
                <hr />
                {description ? <p>{description}</p> : null}
                <hr />
                {title ? <p>{title}</p> : null}
                {poster ? <img src={poster.large} alt="" /> : <img src={image.poster} />}
                {url ? <a href={url.url}>View on IMBD</a> : null}
            </div>
        );
    }
}

DisplayItem.propTypes = {
    location: PropTypes.object,
};
DisplayItem.defaultProps = {};

export default DisplayItem;
