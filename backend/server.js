const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Modelo de Producto
const Product = mongoose.model('Product', new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    stock: Number,
}));

// Rutas
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Ruta para crear un producto (requiere login de administrador)
app.post('/admin/product', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
