const express = require('express');
const cors = require('cors'); // Importar cors
const sequelize = require('./config/database');
require('./models/index');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Works api' });
});

app.use('/api/usuarios', require('./routes/UsuarioRoutes'));
app.use('/api/cupones', require('./routes/CuponRoutes'));
app.use('/api/canjes', require('./routes/CanjeRoutes'));
app.use('/api/roles', require('./routes/RolRoutes'));

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Run in ${PORT}`);
    });
}).catch(err => {
    console.error('Error conectando a la base de datos:', err);
});
