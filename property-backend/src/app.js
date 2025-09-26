const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const propertyRoutes = require('./routes/property.routes');
const errorHandler = require('./utils/errorHandler');


const app = express();


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => res.json({ message: 'Property API is up' }));


app.use('/', propertyRoutes);


app.use(errorHandler);


module.exports = app;