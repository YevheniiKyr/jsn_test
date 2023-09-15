const Superhero = require("../models/superhero");
const {tryCatch} = require("../utils/tryCatch");
const NotFoundException = require("../exceptions/NotFoundException");
const path = require("path");
const uuid = require('uuid')

class SuperheroController {

    async create(req, res) {

        const {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body
        const {images} = req.files
        let fileNames = []
        await images.map(image => {
            let fileName = uuid.v4()
            image.mv(path.resolve(__dirname, '..', 'static', fileName + '.jpg'))
            fileNames.push(fileName)
        })
        const hero = await Superhero.create({
            nickname,
            real_name,
            images: fileNames,
            origin_description,
            superpowers,
            catch_phrase
        })
        if (!hero) throw new Error('Cant create hero with this fields')
        return res.json(hero)

    }

    async getAll(req, res) {
        let {limit, page} = req.query

        page = page || 1
        limit = limit || 15

        const offset = page * limit - limit
        const count = await Superhero.count();
        const heroes = await Superhero.find().skip(offset).limit(limit)

        res.json({heroes, count})
    }

    async getByID(req, res) {
        let id = req.params.id
        const hero = await Superhero.findById(id);
        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        res.json(hero);
    }


}

module.exports = new SuperheroController()