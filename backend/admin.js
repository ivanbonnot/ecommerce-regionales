// Modelo de Administrador
const Admin = mongoose.model('Admin', new mongoose.Schema({
    username: String,
    password: String,
}));

// Ruta de autenticación
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: admin._id }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
});

// Middleware de autenticación
const auth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });
    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.admin = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};

// Ruta protegida para crear un producto
app.post('/admin/product', auth, async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});
