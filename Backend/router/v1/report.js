const express = require('express');
const router = express.Router();
const reportCtrl = require('./report.ctrl');

module.exports = () => {
  router.use((req, res, next) => {
    next();
  });

  router.all('/', (req, res) => {
    res.status(404).send("This is not normal route");
  });

  router.post('/create', reportCtrl.createReport);
  router.get('/list', reportCtrl.showReportList);
  router.get('/find/:reportId', reportCtrl.findReport);
  router.delete('/delete/:reportId', reportCtrl.deleteReport);
  router.put('/update/:reportId', reportCtrl.edit);

return router;
};
