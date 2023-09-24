const uuid = require("uuid");
const path = require("path");
const Superhero = require("../models/superhero");
const CantCreateException = require("../exceptions/CantCreateException");
const NotFoundException = require("../exceptions/NotFoundException");
const fs = require("fs");
const ParamsNotPassed = require("../exceptions/ParamsNotPassed");

class SuperheroService {


    saveFiles = (files) => {
        let fileNames = []
        if (!Array.isArray(files)) {
            files = [files]
        }
        files.map(image => {
            let fileName = uuid.v4() + '.jpg'
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            fileNames.push(fileName)
        })
        return fileNames
    }

    async create (superhero, images) {

        let {nickname, real_name, origin_description, superpowers, catch_phrase} = superhero
        superpowers = JSON.parse(superpowers)
        let fileNames = this.saveFiles(images)
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
        return hero
    }

    async getAll(limit, page) {
        page = page || 1
        limit = limit || 5

        const offset = page * limit - limit
        const heroes = await Superhero.find().skip(offset).limit(limit)
        console.log('heroes')
        const count = await Superhero.count();
        return ({heroes, count})
    }

    async getByID(id, limit, page) {

        const hero = await Superhero.findById(id);
        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        return hero

    }


    deleteFile = (filePath) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${filePath}: ${err}`);
            } else {
                console.log(`File ${filePath} has been deleted.`);
            }
        });
    }

    async update(superhero, id, images) {

        let {
            nickname, real_name, origin_description,
            superpowers, catch_phrase, old_file_names
        } = superhero

        const hero = await Superhero.findById(id);

        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }

        if (old_file_names) {
            if (!Array.isArray(old_file_names)) {
                old_file_names = [old_file_names]
            }
            hero.images.map(image => {
                if (!old_file_names.find(name => name === image)) {
                    const filePath = path.join(__dirname, '..', 'static', image);
                    this.deleteFile(filePath)
                }
            })
        } else {
            hero.images.map(image => {
                const filePath = path.join(__dirname, '..', 'static', image);
                this.deleteFile(filePath)
            })
        }
        let fileNames = this.saveFiles(images)
        superpowers = JSON.parse(superpowers)
        old_file_names = old_file_names || [];
        let newHero = {
            real_name,
            nickname,
            origin_description,
            superpowers,
            catch_phrase,
            images: [...old_file_names, ...fileNames]
        }
        const updatedHero = await Superhero.findByIdAndUpdate(id, newHero, {new: true});
        return updatedHero
    }

    async delete(id) {
        if (!id) {
            throw new ParamsNotPassed(`Params wasn't passed:`, id)
        }
        const deletedHero = await Superhero.findByIdAndDelete(id);

        if (!deletedHero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        return deletedHero
    }


}

module.exports = new SuperheroService()