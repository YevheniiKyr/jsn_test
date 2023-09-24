const SuperheroService = require('../services/superheroService')
const {tryCatch} = require("../utils/tryCatch");

class SuperheroController {

    async create(req, res) {
        try {
            const hero = (await SuperheroService.create(req.body, req.files.images))
            return res.json(hero)
        } catch (e) {
            throw e
        }
    }

    async getAll(req, res) {
        try {
            let {limit, page} = req.query
            const response = (await SuperheroService.getAll(limit, page))
            res.json(response)
        } catch (e) {
            throw e
        }
    }

    async getByID(req, res) {
        try {
            let id = req.params.id
            const {limit, page} = req.body
            const hero = await (SuperheroService.getByID(id, limit, page))
            res.json(hero);
        } catch (e) {
            throw e
        }
    }

    async update(req, res) {
        try {
            let images = req.files?.images
            let {id} = req.params
            const updatedHero = (await SuperheroService.update(req.body, id, images))
            return res.json(updatedHero)
        } catch (e) {
            throw e
        }

    }


    async delete(req, res) {
        try {

            const {id} = req.params
            const deletedHero = await SuperheroService.delete(id)
            return res.json(deletedHero);
        } catch (e) {
            throw e
        }
    }


}

module.exports = new SuperheroController()