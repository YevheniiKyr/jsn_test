const superheroController = require("../controllers/superheroController");
const {Schemas, ValidateHero} = require("../middlewares/validateHero");
const router = require('express').Router()

router.get('/', superheroController.getAll)
router.get('/:id', superheroController.getByID)
router.put('/:id', ValidateHero(Schemas.hero.update), superheroController.update)
router.delete('/:id', superheroController.delete)
router.post('/', ValidateHero(Schemas.hero.create),superheroController.create)

module.exports = router
