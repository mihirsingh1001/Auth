const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const api = require('./route/api');
const app = express();

app.use(cors()); //because there is change in PORT.
app.use(bodyParser.json()); //bodyParser to handle json data

app.use('/api', api);
// test get request
app.get('/', function(req, res){
    res.send('Hello from server')
});

app.listen(PORT, function(req, res){
    console.log('Server running from port ' + PORT);
})