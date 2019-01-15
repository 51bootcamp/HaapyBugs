const express = require('express');
const router = express.Router();
const ctrl = require('./report.ctrl')

router.use((req,res,next) => {
  console.log("report router");
  next();
});

router.all('/', (req,res) => {
  res.send("this is report root");
});

router.post('/create', ctrl.create);

module.exports = router;