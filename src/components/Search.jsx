import React from "react";
import PropTypes from "prop-types";
import DisplayData from "./DisplayData";

const Search = props => console.log(props.name) ||
<div>
    {props.name}
    <form onSubmit={event => props.handleSubmit(event)}>
        <input
            type="text"
            value={props.value}
            onChange={event => props.handleChange(event, props.search)}
        />
        <button type="submit"> SUBMIT </button>
    </form>
    {props.movies.movies.length > 0
        ? <DisplayData data={props.movies.movies} url={props.routes.titleShow} />
        : null}
    {props.actors.length > 0
        ? <DisplayData data={props.actors} url={props.routes.actorShow} />
        : null}
</div>;

Search.propTypes = {};
Search.defaultProps = {
    movies: { movies: [] },
    actors: { actors: [] },
    directors: { directors: [] },
    votes: { votes: [] },
};

export default Search;
