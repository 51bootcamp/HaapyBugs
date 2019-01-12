const express = require('express');
const router = express.Router();
const models = require('../../models');
const crypto = require('crypto')

router.use((req,res,next) => {
  console.log("user router");
  next();
});

router.all('/', (req,res) => {
  res.send("this is user root");
})

router.post('/signup', (req, res) => {

  console.log("Email : " + req.body.email)
  console.log("Password : " + req.body.password)


  models.user.findAll({
    where: {
      email: req.body.email
    }
=======
  let hashPassword = crypto.createHash("sha512").update(req.body.password).digest("hex");

  models.user.create({
      email : req.body.email,
      password : hashPassword,

>>>>>>> 39504b49b82705b19cea3df31ba11c4fbddf59e8
  }).then(result => {
    if (result == "") {

      models.user.create({
          email : req.body.email,
          password : req.body.password,
      }).then(result => {
          console.log("< " + req.body.email + " > membership has been completed.");
          res.send(
            "< " + req.body.email + " > membership has been completed."
          );
      });
    } else {
      console.log("< " + req.body.email + " > are already a member");
      res.send(
        "< " + req.body.email + " > are already a member"
      );
    }
  });

});

module.exports = router;
