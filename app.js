const express = require('express');
const bodyParser = require('body-parser');

const transaction = require('./routes/transaction.route');
const config = require('./config/transaction.config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/transaction', transaction);

let port = config.PORT;

const server = app.listen(port, () => {
    console.log('The app is running at - http://localhost:' + port);
});