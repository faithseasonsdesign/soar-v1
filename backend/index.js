require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { dbConnection } = require('./database/database');

const PORT = process.env.PORT || 5001;
const APP_BASE_URL = process.env.APP_BASE_URL || '/api'; // Default to '/api' if not set
const app = express();

// CORS Configuration
const corsOptions = {
    origin: ['http://localhost:3000', 'https://your-production-domain.com'], // Allow trusted domains
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Credentials',
    ],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Debug Middleware
app.use((req, res, next) => {
    console.log('Request Path:', req.path);
    console.log('Request Body Information:', req.body);
    next();
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error Stack:', err.stack);
    res.status(500).send('Something went wrong!');
});

// Serve Static Files
app.use(express.static('public'));

// Import and Mount Routes
const userRouter = require('./routes/usersRoutes/usersRoutes');
app.use(APP_BASE_URL, userRouter);

// Application Starter
const startApplication = (port) => {
    app.listen(port, () => {
        console.log(`SOAR Application Running On Port: ${port}`);
    }).on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`${port} already in use. Retrying on another port...`);
            startApplication(port + 1);
        } else {
            console.error('Failed to start the application:', error.message);
        }
    });
};

// Database Connection
const databaseConnection = async () => {
    try {
        const isConnected = await dbConnection();
        if (isConnected) {
            console.log('Connected to the SOAR-V1 Database Successfully');
            startApplication(PORT);
        } else {
            throw new Error('Database connection failed.');
        }
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

databaseConnection();
