import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayItem extends Component {
    componentWillMount() {
        if (!this.props.location.state) {
            this.props.history.push(this.props.routes.landing);
        }
    }

    renderMovie = (movie, index) => (
        <div key={`${movie.title}${index}`}>
            <p>{movie.title}</p>
            <a href={movie.url}>See On IMBD</a>
        </div>
    );

    renderMovies = (movies, route, url) => (
        <div>
            {this.props.match.path === `${route}/:${url}`
                ? movies.map((movie, index) => this.renderMovie(movie, index))
                : null}
        </div>
    );

    render() {
        if (!this.props.location.state) {
            return null;
        }
        const {
            rating,
            description,
            title,
            poster,
            url,
            image,
            filmography,
        } = this.props.location.state;
        return (
            <div>
                {rating ? <p>{rating}</p> : null}
                <hr />
                {description ? <p>{description}</p> : null}
                {title ? <p>{title}</p> : null}
                {poster ? <img src={poster.large} alt="" /> : <img src={image.poster} />}
                {url ? <a href={url.url}>View on IMBD</a> : null}
                {filmography
                    ? <div>
                        {filmography.actor
                              ? this.renderMovies(
                                    filmography.actor,
                                    this.props.routes.actorShow,
                                    'actor',
                                )
                              : null}
                        {filmography.actress
                              ? this.renderMovies(
                                    filmography.actress,
                                    this.props.routes.actorShow,
                                    'actor',
                                )
                              : null}
                        {filmography.director
                              ? this.renderMovies(
                                    filmography.director,
                                    this.props.routes.directorShow,
                                    'director',
                                )
                              : null}
                    </div>
                    : null}
            </div>
        );
    }
}

DisplayItem.propTypes = {
    location: PropTypes.object,
};
DisplayItem.defaultProps = {
    rating: 'No rating',
    location: {
        state: {
            filmography: {
                actor: [],
                actress: [],
                producer: [],
            },
        },
    },
};

export default DisplayItem;
