import React from 'react';
import PropTypes from 'prop-types';
import DisplayData from './DisplayData';

const Search = props => console.log(props, 'testing') ||
<div>
    <form onSubmit={event => props.handleSubmit(event)}>
        <div className="row large-offset-4">
           <div className="column">
               {props.name}
           </div>
        </div>
        <div className="row large-offset-3">
            <div className="column large-6">
                <input
                    type="text"
                    value={props.value}
                    onChange={event => props.handleChange(event, props.search)}
                />
            </div>
            <div className="column">
                <button type="submit" className="button button--small"> SUBMIT </button>
            </div>
        </div>
    </form>
    {props.movies.movies.length > 0
        ? <DisplayData data={props.movies.movies} url={props.routes.titleShow} />
        : null}
    {props.actors.length > 0
        ? <DisplayData data={props.actors} url={props.routes.actorShow} />
        : null}
    {props.directors.length > 0
        ? <DisplayData data={props.directors} url={props.routes.directorShow} />
        : null}
    {props.imbdData.filter(Boolean).length > 0
        ? <DisplayData data={props.imbdData} url={props.imbdRoute} />
        : null}
</div>;

Search.propTypes = {};
Search.defaultProps = {
    movies: { movies: [] },
    actors: { actors: [] },
    directors: { directors: [] },
    votes: { votes: [] },
    imbdData: [],
};

export default Search;
