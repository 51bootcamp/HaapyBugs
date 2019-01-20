const models = require('../models');
const crypto = require('crypto')

module.exports = (app) => {

  const passport = require('passport');
  LocalStrategy = require('passport-local').Strategy;

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    // console.log('serialize : ', user);
    done(null, user.email);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserialize", id);
    models.user.findAll({
      where: {
        email: id
      }
    })
      .then(user => done(null, user))
      .catch(e => done(e, false))
  });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (username, password, done) => {
      let hashPassword = crypto.createHash("sha512").update(password).digest("hex");
      models.user.findAll({
        where: {
          email: username
        }
      }).then(result => {
        if (result == "") {
          return done(null, false, {msg: 'incorrect user'});
        }
        if (hashPassword !== result[0].password) {
          return done(null, false, {msg: 'incorrect password'});
        }
        return done(null, result[0]);
      });
    }
  ));

  return passport;
};
