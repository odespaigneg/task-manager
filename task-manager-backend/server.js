const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const tasksRouter = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); 

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ORIGIN_ACCEPT_URL || 'http://localhost:3000'
}));
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/tasks', tasksRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error(err));