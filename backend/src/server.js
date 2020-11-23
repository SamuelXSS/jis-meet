const express = require('express');
const routes = require('./routes.js');
const app = express();
const cors = require('cors')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Expose-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Expose-Headers', 'X-Total-Count')
  app.use(cors());
  next();
});
require('dotenv').config()
require('./database')

app.listen(process.env.PORT || 3000)
app.use(express.json())
app.use(routes)