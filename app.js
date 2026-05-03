const express = require('express');
const routes = require('./src/routes')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', routes);

module.exports = app;