const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
// Build an allow-list from ALLOWED_ORIGINS env var (comma-separated),
// always including the production Vercel URL and localhost for dev.
const ALWAYS_ALLOWED = [
    'https://elohim-fire-church.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
];

const envOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : [];

const allowedOrigins = [...new Set([...ALWAYS_ALLOWED, ...envOrigins])];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow server-to-server requests (no origin) and listed origins
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin ${origin} not allowed`));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));
// Handle OPTIONS preflight explicitly for all routes
app.options('*', cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/messages', require('./src/routes/messages'));
app.use('/api/events', require('./src/routes/events'));
app.use('/api/analytics', require('./src/routes/analytics'));
// app.use('/api/sermons', require('./src/routes/sermons'));

app.get('/', (req, res) => {
    res.send('Elohim Fire Ministries API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
