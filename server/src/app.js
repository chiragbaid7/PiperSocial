const express = require('express');

const app = express();

const morgan = require('morgan');

const helmet = require('helmet');

const cors = require("cors");

const apiV1 = require('./interface/routes/v1/index');
//const {sequelize} = require('./domain/models/index');
const {errorHandler, pageNotfound} = require('./middleware/ErrorHandler');


//sequelize.sync({force: true})

app.use(express.json());
app.use(morgan('tiny'));
app.use(helmet())
app.use(
  cors({
    origin: "https://pipersocial.netlify.app",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use('/api/v1', apiV1);
app.use(pageNotfound);
app.use(errorHandler);

app.listen(8080);
