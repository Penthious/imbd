import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import routes from '../routes';
import Landing from '../pages/Landing';
import NotFoundPage from '../pages/NotFoundPage';

/*
 This needs to be a class for hot module reloading to work
 */
class Root extends React.Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route
                            path={routes.landing}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route
                            path={routes.titleSearch}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route
                            path={`${routes.titleShow}/:title`}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route
                            path={routes.actorSearch}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route
                            path={`${routes.actorShow}/:actor`}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route
                            path={routes.directorSearch}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route
                            path={`${routes.directorShow}/:director`}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route
                            path={routes.idSearch}
                            render={props => <Landing routes={routes} {...props} />}
                        />
                        <Route component={NotFoundPage} landing={routes.landing} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

Root.propTypes = {
    store: PropTypes.shape().isRequired,
    history: PropTypes.shape().isRequired,
};

export default Root;
