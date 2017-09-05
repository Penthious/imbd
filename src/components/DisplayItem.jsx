import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayItem extends Component {
    static propTypes = {
        location: PropTypes.object,
        history: PropTypes.object,
        routes: PropTypes.object,
        match: PropTypes.object,
    };

    static defaultProps = {
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

    componentWillMount() {
        if (!this.props.location.state) {
            this.props.history.push(this.props.routes.landing);
        }
    }

    /*
     * Displays the movie
     * @param {Object} movie - The movie data
     * @param {int} index - The index of the movie
     */
    renderMovie = (movie, index) => (
        <div key={`${movie.title}${index}`} className="row">
            <div className="column small-offset-3">
                <p>{movie.title}</p>
            </div>
            <div className="column">
                <a href={movie.url} target="_blank">See On IMBD</a>
            </div>
        </div>
    );

    /*
     * Displays a list of movies
     * @param {Array.<Object>} movies - The movie data
     * @param {string} route - The route name
     * @param {string} url - The route parameter
     */
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
                <div className="row marg-top-20 text-center">
                    <div className="column">
                        {poster ?
                            <img src={poster.large} alt="image"
                                 style={{ width: '300px', height: '600px' }} />
                            : <img src={image.poster} alt="image"
                                   style={{ width: '300px', height: '600px' }} />}
                    </div>
                </div>
                <div className="row text-center">
                    <div className="column small-offset-4 small-2">
                        {title ? <p>{title}</p> : null}
                    </div>
                    <div className="column small-2">
                        {rating ? <p>Rating: {rating}</p> : null}
                    </div>
                </div>
                <div className="row text-center">
                    <div className="column">
                        {description ? <p>{description}</p> : null}
                    </div>
                </div>
                <div className="row text-center">
                    <div className="column">
                        {url ? <a href={url.url}>View on IMBD</a> : null}
                    </div>
                </div>
                <hr />
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

export default DisplayItem;
