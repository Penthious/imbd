import { applyMiddleware, compose, createStore } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";

export const history = createHistory();

function configureStoreProd() {
    const middlewares = [
        // Add other middleware on this line...

        // Able to push routes to url
        routerMiddleware(history),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,
    ];

    return createStore(rootReducer, compose(applyMiddleware(...middlewares)));
}

function configureStoreDev() {
    const middlewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate your state either
        // inside a dispatch or between dispatches.
        reduxImmutableStateInvariant({
            ignore: [
                "form.businessCreate.values.image.0.lastModifiedDate",
                // 'form.subscription.values.exp_month',
                // 'form.subscription.values.exp',
                // 'form.subscription.values.exp_year',
                "form.businessEdit.values.image.0.lastModifiedDate",
            ],
        }),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk,

        // Able to view all state change
        logger,

        // Able to push routes to url
        routerMiddleware(history),
    ];
    // add support for Redux dev tools
    // eslint-disable-next-line no-underscore-dangle
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            const nextReducer = require("../reducers").default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;
