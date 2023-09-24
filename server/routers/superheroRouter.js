const superheroController = require("../controllers/superheroController");
const {tryCatch} = require("../utils/tryCatch");
const {Schemas, ValidateHero} = require("../middlewares/validateHero");
const router = require('express').Router()

router.get('/', tryCatch(superheroController.getAll))
router.get('/:id', tryCatch(superheroController.getByID))
router.put('/:id', ValidateHero(Schemas.hero.update), tryCatch(superheroController.update))
router.delete('/:id', tryCatch(superheroController.delete))
router.post('/', ValidateHero(Schemas.hero.create),tryCatch(superheroController.create))

module.exports = router
