/* eslint-disable import/default */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import configureStore, { history } from './store/configureStore';

import './assets/scss/foundation.scss';
import '../node_modules/font-awesome/css/font-awesome.min.css';

require('./favicon.ico'); // Tell webpack to load favicon.ico

const store = configureStore();

// Checks if token exists if so log in user

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('app'),
);

if (module.hot) {
    module.hot.accept('./components/Root', () => {
        console.log('new root');
        const NewRoot = require('./components/Root').default; // eslint-disable-line global-require
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('app'),
        );
    });
}
