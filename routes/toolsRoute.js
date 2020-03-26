const {Router} = require('express')
const router = Router()
const DueDate = require("../models/DueDate")
const DueDateService = require('../services/DueDateService')

router.post("/calc",function(req, res) {
  const dueDateModel = new DueDate(req.body.date, req.body.turnaroundTime);
  const dueDateService = new DueDateService;

  const result = dueDateService.calculateDueDate(dueDateModel);

  res.send(result +"");
});


module.exports = router;
