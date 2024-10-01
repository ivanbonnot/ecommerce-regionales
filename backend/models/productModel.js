const mongoose = require('mongoose');

// Modelo de Producto
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    stock: Number,
}));

module.export = Product;