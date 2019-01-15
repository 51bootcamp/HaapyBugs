const models = require('../../models');

const create = (req, res) => {
    models.report.create({
        what : req.body.data[0].what,
        location : req.body.data[0].location,
        time : req.body.data[0].time,
        who : req.body.data[0].who,
        details : req.body.data[0].details,
    }).then(result => {
        console.log(result);
        console.log("success!");
    });
    res.status(201);
    res.send("good");
  }

  module.exports = {
      create
  }