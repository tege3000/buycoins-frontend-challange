require('dotenv').config();

const express = require('express');
const app = express();
const SERVER_PORT = 3000;

app.use(express.static('public'));

app.listen(process.env.PORT || SERVER_PORT, () => {
    console.log('Server listening on port ' + SERVER_PORT)
});