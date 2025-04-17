const uuid = require("uuid");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
const Superhero = require("../models/superhero");
const CantCreateException = require("../exceptions/CantCreateException");
const NotFoundException = require("../exceptions/NotFoundException");
const ParamsNotPassed = require("../exceptions/ParamsNotPassed");
const CloudinaryUploadException = require("../exceptions/CloudinaryUploadException");
const CloudinaryDeleteException = require("../exceptions/CloudinaryDeleteException");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

class SuperheroService {

    async saveFiles(files) {
        if (!Array.isArray(files)) {
            files = [files]
        }

        const uploadToCloudinary = (file) => {
            return new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        public_id: uuid.v4(),
                        folder: 'superheroes'
                    },
                    (error, result) => {
                        if (error) {
                            console.error('Помилка Cloudinary:', error)
                            return reject(error)
                        }
                        resolve(result.public_id)
                    }
                )
                streamifier.createReadStream(file.data).pipe(uploadStream)
            })
        }

        const uploadPromises = files.map(file =>
            uploadToCloudinary(file).catch(err => {
                console.warn(`Пропущено зображення ${file.name} через помилку: ${err.message}`);
                return null;
            })
        );

        const results = await Promise.all(uploadPromises);
        return results.filter(id => id !== null);
    }

    async create(superhero, images) {

        let {nickname, real_name, origin_description, superpowers, catch_phrase} = superhero
        superpowers = JSON.parse(superpowers)
        let fileNames = await this.saveFiles(images)
        if (!fileNames.length) throw new CloudinaryUploadException(`Can't upload files to cloudinary`)
        const hero = await Superhero.create({
            nickname,
            real_name,
            origin_description,
            superpowers,
            catch_phrase,
            images: fileNames
        }).catch(() => {
            throw new CantCreateException('Cant create hero with this fields')
        })
        return hero
    }

    async getAll(limit, page) {
        page = page || 1
        limit = limit || 5

        const offset = page * limit - limit
        const heroes = await Superhero.find({}).skip(offset).limit(limit)
        const count = await Superhero.count();
        return ({heroes, count})
    }

    async getByID(id) {
        const hero = await Superhero.findById(id);
        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        return hero

    }


    async deleteFiles(publicIds) {
        if(!publicIds.length) return;
        const deletePromises = publicIds.map(id =>
            cloudinary.uploader.destroy(id)
                .then(result => {
                    if (result.result !== 'ok') throw new CloudinaryDeleteException(`Can't delete file: ${id}`);
                })
                .catch(err => {
                    throw new CloudinaryDeleteException(`Error deleting ${id}: ${err.message}`);
                })
        );
        await Promise.all(deletePromises);
    }


    async update(superhero, id, images) {
        let {
            nickname, real_name, origin_description,
            superpowers, catch_phrase, old_file_names
        } = superhero
        let fileNames = []
        const hero = await Superhero.findById(id);

        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`)
        }
        if (old_file_names) {
            if (!Array.isArray(old_file_names)) {
                old_file_names = [old_file_names]
            }
            let filesToDelete = [];
            hero.images.map(fileName => {
                if (!old_file_names.find(name => name === fileName)) {
                    filesToDelete.push(fileName);
                }
            })
            await this.deleteFiles(filesToDelete)
        } else {
           await this.deleteFiles(images)
        }
        if (images) fileNames = await this.saveFiles(images)
        superpowers = JSON.parse(superpowers)
        old_file_names = old_file_names || [];
        if (!Array.isArray(fileNames)) {
            fileNames = [fileNames]
        }
        let newHero = {
            real_name,
            nickname,
            origin_description,
            superpowers,
            catch_phrase,
            images: [...old_file_names, ...fileNames]
        }
        return Superhero.findByIdAndUpdate(id, newHero, {new: true});
    }


    async delete(id) {
        if (!id) throw new ParamsNotPassed(`Params wasn't passed:`, id);

        const hero = await Superhero.findById(id);
        if (!hero) {
            throw new NotFoundException(`Superhero with id ${id} is not found`);
        }
        await this.deleteFiles(hero.images);
        return Superhero.findByIdAndDelete(id);
    }


}

module.exports = new SuperheroService()