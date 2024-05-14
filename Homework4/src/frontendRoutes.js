const express = require('express');
const frontendRouter = express.Router();

const path = require('path');
frontendRouter.use(express.static('static'));
frontendRouter.use(express.urlencoded({ extended: true }));

const html_dir = path.join(__dirname, '../templates/');

// Serve the main page
frontendRouter.get('/', (req, res) => {
    res.sendFile(`${html_dir}index.html`);
});

// Serve the login page
frontendRouter.get('/login', (req, res) => {
    res.sendFile(`${html_dir}login.html`);
});

// Serve the profile page
// router.get('/profile', (req, res) => {
//     res.sendFile(path.join(__dirname, '../templates', 'profile.html'));
// });

module.exports = frontendRouter;