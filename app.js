const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes')
const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', routes);

module.exports = app;