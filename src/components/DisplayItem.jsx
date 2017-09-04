import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DisplayItem extends Component {
    componentWillMount() {
        if (!this.props.location.state) {
            this.props.history.push(this.props.routes.landing);
        }
    }

    renderMovie = movie => (
        <div>
            <p>{movie.title}</p>
            <a href={movie.url}>See On IMBD</a>
        </div>
    );

    renderActorMovies = movies => (
        <div>
            {this.props.match.path === `${this.props.routes.actorShow}/:actor`
                ? movies.map(movie => this.renderMovie(movie))
                : null}
        </div>
    );

    renderMovies = (movies, route, url) => (
        <div>
            {this.props.match.path === `${route}/:${url}`
                ? movies.map(movie => this.renderMovie(movie))
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
                <div style={{ backgroundColor: '#1f4662', color: '#fff', fontSize: '12px' }}>
                    <div style={{ backgroundColor: '#193549', padding: '5px 10px', fontFamily: 'monospace', color: '#ffc600' }}>
                        <strong>Debug</strong>
                    </div>
                    <pre style={{ display: 'block', padding: '10px 30px', margin: '0', overflow: 'scroll' }}>
                        {JSON.stringify(this.props, null, 2)}
                    </pre>
                </div>
                <hr />
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
