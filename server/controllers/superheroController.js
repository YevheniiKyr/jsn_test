const Superhero = require("../models/superhero");
const {tryCatch} = require("../utils/tryCatch");
const NotFoundException = require("../exceptions/NotFoundException");
const path = require("path");
const uuid = require('uuid')
const ParamsNotPassed = require("../exceptions/ParamsNotPassed");

class SuperheroController {

    async create(req, res) {
        console.log('create hero')

        const {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body
        const {images} = req.files
        let fileNames = []
        await images.map(image => {
            let fileName = uuid.v4()
            image.mv(path.resolve(__dirname, '..', 'static', fileName + '.jpg'))
            fileNames.push(fileName)
        })
        console.log('FILENAMES', fileNames)
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
        console.log('find all')

        let {limit, page} = req.query

        page = page || 1
        limit = limit || 5

        const offset = page * limit - limit
        const count = await Superhero.count();
        const heroes = await Superhero.find().skip(offset).limit(limit)

        res.json({heroes, count})
    }

    async getByID(req, res) {
        console.log('find by id')
        let id = req.params.id
        const hero = await Superhero.findById(id);
        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        res.json(hero);
    }

    async update(req, res) {
        console.log('update hero')

        let {id} = req.params
        const updatedData = req.body
        const hero = await Superhero.findById(id);
        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        const updatedHero = await Superhero.findByIdAndUpdate(id, updatedData, {new: true});
        return res.json(updatedHero)

    }

    async delete(req, res) {
        console.log('delete hero')

        const {id} = req.params
        if (!id) {
            throw new ParamsNotPassed(`Params wasn't passed:`, id)
        }
        const deletedHero = await Superhero.findByIdAndDelete(id);

        if (!deletedHero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        } else res.json(deletedHero);


    }


}

module.exports = new SuperheroController()