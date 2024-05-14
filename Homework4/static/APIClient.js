import HTTPClient from './HTTPClient.js';

const API_BASE = `/api`;

const getCurrentUser = () => {
    return HTTPClient.get(`${API_BASE}/users/current`);
};

const logIn = (username) => {
    return HTTPClient.post(`${API_BASE}/users/login`, { username });
};

const logOut = () => {
    return HTTPClient.post(`${API_BASE}/users/logout`, {});
};

export default {
    getCurrentUser,
    logIn,
    logOut
};

