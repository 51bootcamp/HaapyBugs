const express = require('express');
const router = express.Router();
const models = require('../../models');
const crypto = require('crypto');
const session = require('express-session');

router.use(session({
  key: 'sid',
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24000*60*60
  }
}));


router.use((req,res,next) => {
  console.log("user router");
  next();
});

router.all('/', (req,res) => {
  res.send("this is user root");
});

router.get('/signin', (req, res) => {

  let session = req.session;

  models.user.findAll({
    where: {
      email: req.query.email
    }
  }).then(result => {
    if (result=="")
    {
      console.log("User does not exit");
      res.json({msg: "User does not exit"});
    } else {
      let dbPassword = result[0].dataValues.password;
      let hashPassword = crypto.createHash("sha512").update(req.query.password).digest("hex");

      if(dbPassword == hashPassword) {
        console.log("Password Match");

        req.session.email = req.query.email;
        res.json({msg: req.session.email});

      } else {
        console.log("Password not Match");
        res.json({msg: "Password not Match"});
      };
    };

  }).catch( err => {
    console.log(err);
    res.json({msg: "err"});
  });

});

router.get('/signout', (req, res) => {

  req.session.destroy();
  res.clearCookie('sid');

});

module.exports = router;
