const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorHandler');
const logger = require('./utils/logger');
const router = require('./routes/markdownRoutes');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

app.use('/api/markdown', router);


// Error handling middleware
app.use(errorHandler);

module.exports = app;
