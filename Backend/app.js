const express = require('express');
const app = express();
const models = require('./models');
const bodyParser = require('body-parser');
const router = express.Router();
const session = require('express-session');

models.sequelize.sync();

app.use(session({
  secret: 'asadlkj!a@#a!@a#dfgasdg',
  cookie: {maxAge: 60000},
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const passport = require('./lib/passport')(app);
const rootRouter = require('./router/index')(passport);

app.use('/api', rootRouter);

app.listen(80, () => {
  console.log("Server Start");
});
