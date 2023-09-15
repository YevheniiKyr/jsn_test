const router = require('express').Router()
const superheroController = require("../controllers/superheroController");
const {tryCatch} = require("../utils/tryCatch");

router.get('/' ,  tryCatch(superheroController.getAll))
router.get('/:id', tryCatch(superheroController.getByID))
router.put('/:id', tryCatch(superheroController.update))
router.delete('/:id', tryCatch(superheroController.delete))
router.post('/', tryCatch(superheroController.create))

module.exports = router
