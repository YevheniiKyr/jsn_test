const Superhero = require("../models/superhero");
const {tryCatch} = require("../utils/tryCatch");
const NotFoundException = require("../exceptions/NotFoundException");
const path = require("path");
const uuid = require('uuid')
const ParamsNotPassed = require("../exceptions/ParamsNotPassed");
const CantCreateException = require("../exceptions/CantCreateException");
const fs = require('fs');

class SuperheroController {

    async create(req, res) {
        console.log('create hero server')

        let {nickname, real_name, origin_description, superpowers, catch_phrase} = req.body
        console.log('get body')

        let {images} = req.files

        let fileNames = []

        superpowers = JSON.parse(superpowers)
        // if (!Array.isArray(images)) {
        //     let image = images
        //     images = []
        //     images.push(image)
        // }

        images.map(image => {
                let fileName = uuid.v4() + '.jpg'
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
                fileNames.push(fileName)
        })

        const hero = await Superhero.create({
            nickname,
            real_name,
            images: fileNames,
            origin_description,
            superpowers,
            catch_phrase
        }).catch(() => {
            throw new CantCreateException('Cant create hero with this fields')
        })
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
        console.log('id')

        let {
            nickname, real_name, origin_description,
            superpowers, catch_phrase, old_file_names
        } = req.body
        console.log('body')

        let images = req.files?.images
        console.log('files')

        console.log('get params')

        const hero = await Superhero.findById(id);
        console.log('found hero')
        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        let fileNames = []
        console.log('we have images')

        if(images) {
            hero.images.map(image => {
                if (!old_file_names.has(image)) {
                    const filePath = path.join(__dirname, '..', 'static', image);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error deleting file ${image}: ${err}`);
                        } else {
                            console.log(`File ${image} has been deleted.`);
                        }
                    });
                }
            })
            console.log('we deleted old  images')

            images.map(image => {
                let fileName = uuid.v4() + '.jpg'
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
                fileNames.push(fileName)
            })
            console.log('added new files to static')

        }

        superpowers = JSON.parse(superpowers)

        let newHero = {real_name, nickname, origin_description, superpowers, catch_phrase, images: [...old_file_names, ...fileNames]}

        const updatedHero = await Superhero.findByIdAndUpdate(id, newHero, {new: true});
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