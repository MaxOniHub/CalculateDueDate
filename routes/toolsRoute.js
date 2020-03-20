const {Router} = require('express')
const router = Router()
const toolsController = require('../controllers/toolsController')

router.post("/calc", toolsController.calculateDueDate)

module.exports = router
