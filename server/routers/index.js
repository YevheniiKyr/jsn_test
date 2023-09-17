const router = require('express').Router()
const superheroRouter = require('./superheroRouter')

router.use('/superhero', superheroRouter)
module.exports = router
