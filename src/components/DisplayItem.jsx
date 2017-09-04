import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayItem extends Component {

    componentWillMount() {
        if (!this.props.location.state) {
            this.props.history.push(this.props.routes.landing);
        }
    }

    renderMovie = (movie) =>
        <div>
            <p>{movie.title}</p>
            <a href={movie.url}>See On IMBD</a>
        </div>;

    renderActorMovies = (movies) =>
        <div>
            {this.props.match.path === `${this.props.routes.actorShow}/:actor` ? movies.map(movie =>
                this.renderMovie(movie)) : null
            }
        </div>;

    renderMovies = (movies, url) =>
        <div>
            {this.props.match.path === `${this.props.routes.directorShow}/:${url}` ? movies.map(movie =>
                this.renderMovie(movie)) : null
            }
        </div>;

    render() {
        if (!this.props.location.state) {
            return null;
        }
        console.log('========');
        console.log('========');
        console.log('DisplayItem-38', this.props.location);
        console.log('========');
        console.log('========');
        const {
            rating, description, title, poster, url, image, filmography,
        } = this.props.location.state;
        return (
            <div>
                {rating ? <p>{rating}</p> : null}
                <hr />
                {description ? <p>{description}</p> : null}
                <hr />
                {title ? <p>{title}</p> : null}
                {poster ? <img src={poster.large} alt="" /> : <img src={image.poster} />}
                {url ? <a href={url.url}>View on IMBD</a> : null}
                {
                    filmography ?
                        <div>
                            {filmography.actor ? this.renderMovies(filmography.actor, 'actor') : null}
                            {filmography.actress ? this.renderMovies(filmography.actress, 'actor') : null}
                            {filmography.director ? this.renderMovies(filmography.director, 'director') : null}
                        </div>
                        : null
                }
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
        }
    }
};

export default DisplayItem;
