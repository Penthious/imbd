import React from 'react';
import PropTypes from 'prop-types';
import DisplayData from './DisplayData';

const Search = props =>
    <div>
        <form onSubmit={event => props.handleSubmit(event)}>
            <div className="row text-center">
                <div className="column">
                    <h1><b>{props.name}</b></h1>
                </div>
            </div>
            <div className="row text-center">
                <div className="column large-6">
                    <input
                        type="text"
                        value={props.value}
                        onChange={event => props.handleChange(event, props.search)}
                    />
                </div>
                <div className="column">
                    <button type="submit" className="button button--small"> SUBMIT</button>
                </div>
            </div>
        </form>
        {props.movies.movies.length > 0
            ? <DisplayData data={props.movies.movies} url={props.routes.titleShow} />
            : null}
        {props.actors.actors.length > 0
            ? <DisplayData data={props.actors.actors} url={props.routes.actorShow} />
            : null}
        {props.directors.directors.length > 0
            ? <DisplayData data={props.directors.directors} url={props.routes.directorShow} />
            : null}
        {props.imbdData.filter(Boolean).length > 0
            ? <DisplayData data={props.imbdData} url={props.imbdRoute} />
            : null}
    </div>;

Search.propTypes = {
    actors: PropTypes.object,
    directors: PropTypes.object,
    movies: PropTypes.object,
    imbdData: PropTypes.arrayOf(PropTypes.object),
    routes: PropTypes.object,
    imbdRoute: PropTypes.string,
    value: PropTypes.string,
    search: PropTypes.string,
    name: PropTypes.string,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
};
Search.defaultProps = {
    movies: { movies: [] },
    actors: { actors: [] },
    directors: { directors: [] },
    imbdData: [],
};

export default Search;
