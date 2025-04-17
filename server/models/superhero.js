const mongoose = require('mongoose')

const SuperheroSchema  = new mongoose.Schema({
    nickname: {type: String, required: true, unique: true},
    real_name: {type: String, required: true, unique: true},
    origin_description: {type: String, required: true, unique: true},
    superpowers: [{type: String, required: true}],
    catch_phrase: {type: String, required: true, unique: true},
    images: [{type: String, unique: true}]
})

module.exports = mongoose.model('Superhero', SuperheroSchema)
