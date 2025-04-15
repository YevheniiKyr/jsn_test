const SuperheroService = require('../services/superheroService')

class SuperheroController {

    async create(req, res, next) {
        try {
            const hero = await SuperheroService.create(req.body, req.files.images)
            return res.json(hero)
        } catch (e) {
            next(e)
        }
    }

    async getAll(req, res, next) {
        try {
            let {limit, page} = req.query
            const response = await SuperheroService.getAll(limit, page)
            res.json(response)
        } catch (e) {
            next(e)
        }
    }

    async getByID(req, res, next) {
        try {
            let id = req.params.id
            const hero = await SuperheroService.getByID(id)
            res.json(hero);
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            let images = req.files?.images
            let {id} = req.params
            const updatedHero = await SuperheroService.update(req.body, id, images)
            return res.json(updatedHero)
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const deletedHero = await SuperheroService.delete(id)
            return res.json(deletedHero);
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new SuperheroController()