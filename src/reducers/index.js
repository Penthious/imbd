import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
    routing: routerReducer,
    form: formReducer.plugin({
        contact: (state, action) => {
            switch (action.type) {
                case "ACCOUNT_SAVE_SUCCESS":
                    return undefined;
                default:
                    return state;
            }
        },
    }),
});

export default rootReducer;
