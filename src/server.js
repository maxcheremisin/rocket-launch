const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;

app.listen(port, function () {
    console.log('Starting server at port: ' + port);
});

app.use('/', express.static(path.join(__dirname, '../build')));

app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '../build')});
});
