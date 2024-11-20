const mongoose = require('mongoose');

// Modelo de Producto
const ProductModel = mongoose.model('Product', new mongoose.Schema({
    idProduct: String,
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    stock: Number,
    date: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
}));

module.export = ProductModel;