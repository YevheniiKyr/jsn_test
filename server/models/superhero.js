const mongoose = require('mongoose')

const Superhero = new mongoose.Schema({
    nickname: {type: String, required: true, unique: true},
    real_name: {type: String, required: true, unique: true},
    origin_description: {type: String, required: true, unique: true},
    superpowers: {type: String, required: true, unique: true},
    catch_phrase: {type: String, required: true, unique: true},
    Images: [{type: String, unique: true}]
})

module.exports = mongoose.models.Superhero ||  mongoose.model('Superhero', Superhero)
