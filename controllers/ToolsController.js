var DueDate = require('../models/DueDate')
const DueDateService = require('../services/DueDateService')

exports.calculateDueDate = function(req, res) {
  const dueDateModel = new DueDate(req.body.date, req.body.turnaroundTime)
  const dueDateService = new DueDateService

  const result = dueDateService.calculateDueDate(dueDateModel)

  res.send(result +"");
};
