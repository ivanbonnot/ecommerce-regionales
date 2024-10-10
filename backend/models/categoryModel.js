const mongoose = require('mongoose')

const CategoryModel = mongoose.model('Category', new mongoose.Schema({
    name: { type: String, required: true },
    description: true
}))

module.export = CategoryModel;