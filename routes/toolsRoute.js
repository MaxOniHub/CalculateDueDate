const {Router} = require('express')
const router = Router()
const { check, validationResult } = require('express-validator')
const errorFormatter = require('../helpers/ErrorFormatter')
const DueDate = require('../models/DueDate')

router.post("/calc",
  function(req, res) {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        throw errors.formatWith(errorFormatter).array({onlyFirstError: true});
      }

    const dueDateModel = new DueDate(req.body.date, req.body.turnaroundTime)
    res.send('NOT IMPLEMENTED: due date');
  })

module.exports = router
