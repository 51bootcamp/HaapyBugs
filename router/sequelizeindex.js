var models = require('./models');
var express = require('express');
var router = express.Router();

router.post('/', (req,res) => {
  models.user.findAll()
  .then((users) => {
    res.render('index', {
      title : "Sequelize: Express Example",
      users : users,
    });
  });
});

module.exports = router;
