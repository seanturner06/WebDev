// Import the express dependency
const express = require('express');
const app = express();

// Specify a port
const port = process.env.PORT || 3000;

// Import routes
const routes = require('./src/routes');
app.use(routes);

app.listen(port, () => console.log('Server listening on port:' + port));