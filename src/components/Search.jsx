import React from "react";
import PropTypes from "prop-types";

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
</div>;

Search.propTypes = {};
Search.defaultProps = {};

export default Search;
