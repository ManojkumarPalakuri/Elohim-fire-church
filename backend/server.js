const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
// origin: true reflects the requesting origin back, which is required
// when credentials: true is set. This safely allows all origins.
const corsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/messages', require('./src/routes/messages'));
app.use('/api/events', require('./src/routes/events'));
app.use('/api/analytics', require('./src/routes/analytics'));
app.use('/api/sermons', require('./src/routes/sermons'));

app.get('/', (req, res) => {
    res.send('Elohim Fire Ministries API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
