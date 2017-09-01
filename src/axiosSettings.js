import axios from "axios";
import { logoutUser } from "./actions/authActions";

const axiosDefaults = () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;
    axios.defaults.baseURL = config.APP_URL;
};

// prettier-ignore
const interceptResponse = (dispatch) => {
    if (axios.interceptors.response.handlers.length !== 0) {
        axios.interceptors.response.eject(axios.interceptors.response.handlers.length - 1);
    }
    axios.interceptors.response.use(
        response => response.data,
        (error) => {
            const isTokenError = /^(token_expired|invalid_token)$/.test(error.response.data.error);
            if (isTokenError) {
                console.log('loging out here');
                dispatch(logoutUser);
            }
            return Promise.reject(error.response.data);
        },
    );
};

const axiosSettings = (dispatch) => {
    axiosDefaults();
    interceptResponse(dispatch);
};

export default axiosSettings;
