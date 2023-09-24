
const SuperheroService = require('../services/superheroService')

class SuperheroController {

    async create(req, res) {
        const hero = await SuperheroService.create(req.body, req.files.images)
        return res.json(hero)
    }

    async getAll(req, res) {
        let {limit, page} = req.query
        const response = SuperheroService.getAll(limit, page)
        res.json(response)
    }

    async getByID(req, res) {
        let id = req.params.id
        const {limit, page} = req.body
        const hero = SuperheroService.getByID(id, limit, page)
        res.json(hero);
    }

    async update(req, res) {
        let images = req.files?.images
        let {id} = req.params
        const updatedHero = SuperheroService.update(req.body, id, images)
        return res.json(updatedHero)

    }


    async delete(req, res) {
        const {id} = req.params
        const deletedHero = SuperheroService.delete(id)
        return res.json(deletedHero);
    }


}

module.exports = new SuperheroController()