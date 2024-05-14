import api from './APIClient.js';

const loginForm = document.querySelector('#loginForm');
const username = document.querySelector('#username');

loginForm.addEventListener('submit', e => {

    e.preventDefault();
    api.logIn(username.value).then(data => {
        document.location = "./";
    }).catch((err) => {
        console.log(username.value);
        if (err.status === 401) {
            alert("Invalid username or password");
        }
    });
});