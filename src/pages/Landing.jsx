import React, { Component } from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import DisplayItem from "../components/DisplayItem";

const INITIAL_STATE = {
    search: { value: "", search: "" },
    movies: { movies: [], error: null },
    movie: {},
    actors: { actors: [], error: null },
    actor: {},
    directors: { directors: [], error: null },
    director: {},
};

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            ...INITIAL_STATE,
        };
    }

    getMovies = (url, param) => Axios.get(`${url}find/movie?title=${param}`)
        .then(
            response => console.log(response) ||
            this.setState({
                ...this.state,
                search: { value: "", search: "" },
                movies: { movies: response.data !== null ? response.data : [] },
            }),
        )
        .catch(error => console.log(error));
    getActors = (url, param) => Axios.get(`${url}find/person?name=${param}`)
        .then(
            response => console.log(response.data) ||
            this.setState({
                ...this.state,
                search: { value: "", search: "" },
                actors: { actors: response.data !== null ? response.data : [] },
            }),
        )
        .catch(error => console.log(error));
    getDirectors = (url, param) => Axios.get(`${url}find/person?name=${param}`)
        .then(
            response => console.log(response) ||
            this.setState({
                ...this.state,
                search: { value: "", search: "" },
                directors: { directors: response.data !== null ? response.data : [] },
            }),
        )
        .catch(error => console.log(error));

    handleChange = (event, searchParam) => {
        this.setState({ search: { value: event.target.value, searchParam } });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.processSearch(this.state.search);
        console.log('========');
        console.log('========');
        console.log('Landing-67', this.state);
        console.log('========');
        console.log('========');
    };

    processSearch = ({ searchParam, value: searchValue }) => {
        const url = "https://theimdbapi.org/api/";
        const formattedSearchValue = searchValue.split(" ").join("+");
        if (searchParam === "title") {
            this.getMovies(url, formattedSearchValue);
        } else if (searchParam === "actor") {
            this.getActors(url, formattedSearchValue);
        } else if (searchParam === "director") {
            this.getDirectors(url, formattedSearchValue);
        }
    };


    render() {
        return (
            <div>
                <Navbar routes={this.props.routes} />
                <Switch>
                    <Route
                        path={this.props.routes.titleSearch}
                        render={props => (
                            <Search
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                name="Search for movies"
                                value={this.state.search.value}
                                routes={this.props.routes}
                                {...props}
                                {...this.state}
                                search="title"
                            />
                        )}
                    />
                    <Route
                        path={`${this.props.routes.titleShow}/:title`}
                        render={props => (
                            <DisplayItem routes={this.props.routes} {...props} />
                        )}
                    />
                    <Route
                        path={this.props.routes.actorSearch}
                        render={props => (
                            <Search
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                search="actor"
                                value={this.state.search.value}
                                actors={this.state.actors.actors}
                                name="Search for actors"
                                routes={this.props.routes}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path={`${this.props.routes.actorShow}/:actor`}
                        render={props => (
                            <DisplayItem routes={this.props.routes} {...props} />
                        )}
                    />
                    <Route
                        path={this.props.routes.directorSearch}
                        render={props => (
                            <Search
                                handleSubmit={this.handleSubmit}
                                handleChange={this.handleChange}
                                search="director"
                                value={this.state.search.value}
                                directors={this.state.directors.directors}
                                name="Search for directors"
                                routes={this.props.routes}
                                {...props}
                            />
                        )}
                    />
                    <Route
                        path={`${this.props.routes.directorShow}/:director`}
                        render={props => (
                            <DisplayItem routes={this.props.routes} {...props} />
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

Landing.propTypes = {
    routes: PropTypes.object,
};
Landing.defaultProps = {};

export default Landing;
