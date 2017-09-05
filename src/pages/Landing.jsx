import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Modal from 'react-modal';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Search from '../components/Search';
import DisplayItem from '../components/DisplayItem';

const INITIAL_STATE = {
    search: { value: '', search: '' },
    movies: { movies: [], error: null },
    movie: {},
    actors: { actors: [], error: null },
    actor: {},
    directors: { directors: [], error: null },
    imbdID: { imbdID: null, route: '', error: null },
    director: {},
    loading: false,
};

class Landing extends Component {
    constructor() {
        super();
        this.state = {
            ...INITIAL_STATE,
        };
    }

    /*
     * Handles getting data through ajax
     * @param {string} url - The url we want to search
     * @param {string} key - The key to set the correct object
     * @param {string|null} route - The front end route if we need it
     */
    getMovieData = (url, key, route = null) => {
        this.setState({ loading: true });
        Axios.get(url)
            .then(
                response => console.log(response) ||
                    this.setState({
                        ...this.state,
                        search: { value: '', search: '' },
                        [key]: {
                            [key]: response.data !== null ? response.data : [],
                            route,
                        },
                        loading: false,
                    }),
            )
            .catch(error => console.log(error) ||
                this.setState({
                    ...this.state,
                    search: { value: '', search: '' },
                    loading: false,
                }),
            );
    };

    /*
     * Handles what url we want to hit
     * @param {Object} event - The event that fired
     * @param {string} searchParam - The type of search
     */
    handleChange = (event, searchParam) => {
        this.setState({ search: { value: event.target.value, searchParam } });
    };

    /*
     * Handles the submit to set our data
     * @param {Object} event - The event that fired
     */
    handleSubmit = (event) => {
        event.preventDefault();
        this.processSearch(this.state.search);
    };

    /*
     * Handles what url we want to hit
     * @param {Object} param
     * @param {string} param.searchParam - The type of search
     * @param {string} param.searchValue - The value we want to search for
     */
    processSearch = ({ searchParam, value: searchValue }) => {
        const url = 'https://theimdbapi.org/api/';
        const formattedSearchValue = searchValue.split(' ').join('+');
        if (searchParam === 'title') {
            this.getMovieData(
                `${url}find/movie?title=${formattedSearchValue}`,
                'movies',
                this.props.routes.titleShow,
            );
        } else if (searchParam === 'actor') {
            this.getMovieData(
                `${url}find/person?name=${formattedSearchValue}`,
                'actors',
                this.props.routes.titleShow,
            );
        } else if (searchParam === 'director') {
            this.getMovieData(
                `${url}find/person?name=${formattedSearchValue}`,
                'directors',
                this.props.routes.titleShow,
            );
        } else if (searchParam === 'id') {
            if (searchValue[0] === 't') {
                this.getMovieData(
                    `${url}movie?movie_id=${formattedSearchValue}`,
                    'imbdID',
                    this.props.routes.titleShow,
                );
            } else if (searchValue[0] === 'n') {
                this.getMovieData(
                    `${url}person?person_id=${formattedSearchValue}`,
                    'imbdID',
                    this.props.routes.titleShow,
                );
            }
        }
    };

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.loading}
                    contentLabel="Modal"
                    style={{
                        content: {
                            opacity: '.5', border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        },
                    }}
                >
                    <p style={{ textAlign: 'center' }}>loading</p>
                </Modal>
                <div>
                    <Navbar routes={this.props.routes} />
                </div>
                <div className="layout-container">
                    <div className="layout-wrapper">
                        <Switch>
                            <Route
                                path={this.props.routes.titleSearch}
                                render={props => (
                                    <Search
                                        handleSubmit={this.handleSubmit}
                                        handleChange={this.handleChange}
                                        name="Search for movies"
                                        value={this.state.search.value}
                                        movies={this.state.movies}
                                        routes={this.props.routes}
                                        {...props}
                                        search="title"
                                    />
                                )}
                            />
                            <Route
                                path={`${this.props.routes.titleShow}/:title`}
                                render={props =>
                                    <DisplayItem
                                        routes={this.props.routes}
                                        {...props}
                                    />
                                }
                            />
                            <Route
                                path={this.props.routes.actorSearch}
                                render={props => (
                                    <Search
                                        handleSubmit={this.handleSubmit}
                                        handleChange={this.handleChange}
                                        search="actor"
                                        value={this.state.search.value}
                                        actors={this.state.actors}
                                        name="Search for actors"
                                        routes={this.props.routes}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path={`${this.props.routes.actorShow}/:actor`}
                                render={props =>
                                    <DisplayItem
                                        routes={this.props.routes}
                                        {...props}
                                    />
                                }
                            />
                            <Route
                                path={this.props.routes.directorSearch}
                                render={props => (
                                    <Search
                                        handleSubmit={this.handleSubmit}
                                        handleChange={this.handleChange}
                                        search="director"
                                        value={this.state.search.value}
                                        directors={this.state.directors}
                                        name="Search for directors"
                                        routes={this.props.routes}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path={`${this.props.routes.directorShow}/:director`}
                                render={props =>
                                    <DisplayItem
                                        routes={this.props.routes}
                                        {...props}
                                    />
                                }
                            />
                            <Route
                                path={this.props.routes.idSearch}
                                render={props => (
                                    <Search
                                        handleSubmit={this.handleSubmit}
                                        handleChange={this.handleChange}
                                        search="id"
                                        value={this.state.search.value}
                                        imbdData={[this.state.imbdID.imbdID]}
                                        imbdRoute={this.state.imbdID.route}
                                        name="Search by ID"
                                        routes={this.props.routes}
                                        {...props}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    routes: PropTypes.object,
};
Landing.defaultProps = {};

export default Landing;
