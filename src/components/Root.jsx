import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { push, ConnectedRouter } from "react-router-redux";
import NotFoundPage from "../pages/NotFoundPage";
import routes from "../routes";

class Root extends React.Component {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <h1>IMBD project</h1>
                    {/* <Switch>*/}
                    {/* <Route component={NotFoundPage} />*/}

                    {/* </Switch>*/}
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
