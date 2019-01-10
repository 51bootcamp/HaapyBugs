const express = require('express');
const app = express();
// manage db
const models = require('./models');
// routers
const router = require('./router')
// to get json data from body
const bodyParser = require('body-parser');

//json encoded
app.use(bodyParser.json());
//url encoded
app.use(bodyParser.urlencoded({
  extended: true,
}))


app.listen(3000, function(){
  console.log("Server Start");
});
