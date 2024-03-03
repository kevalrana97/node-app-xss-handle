require("dotenv").config();
require('./moduleAlias.js')

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

var cors = require('cors')

const app = express();
app.use(cors())
const IndexRoute = require('@routes')

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

//API Routing
app.use('/', IndexRoute)


app.listen(process.env.NODE_PORT,()=>{
    console.log("start project",process.env.NODE_PORT);
})