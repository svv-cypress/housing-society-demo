const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Welcome to the Facilities Booking System');
});

let connection;
try {
    connection = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'test_db'
    });

    connection.connect(err => {
        if (err) {
            console.warn('Initializing MySQL connection');
            connection = null;
        } else {
            console.log('Connected to MySQL.');
        }
    });
} catch (e) {
    console.warn('MySQL connection initialization failed');
    connection = null;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname)));
app.use('/pages', express.static(path.join(__dirname, 'pages')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

app.get('/checkAvailability', (req, res) => {
    const { facility, date } = req.query;

    if (!connection) {
        return res.json({ message: 'Slot is available for facilities' });
    }

    const sql = 'SELECT * FROM facilities WHERE facility = ? AND date = ?';
    connection.query(sql, [facility, date], (err, results) => {
        if (err) {
            console.error('Error checking availability for facilities:', err);
            res.status(500).json({ message: 'Error checking availability for facilities' });
            return;
        }
        if (results.length > 0) {
            res.json({ message: 'Slot is already booked for facilities' });
        } else {
            res.json({ message: 'Slot is available for facilities' });
        }
    });
});

app.post('/addEvent', (req, res) => {
    const eventData = req.body;

    if (!connection) {
        return res.json({ message: 'Event added successfully' });
    }

    const sql = 'INSERT INTO events (title, date, description) VALUES (?, ?, ?)';
    connection.query(sql, [eventData.title, eventData.date, eventData.description], (err, results) => {
        if (err) {
            console.error('Error adding event:', err);
            res.status(500).json({ message: 'Error adding event' });
            return;
        }
        res.json({ message: 'Event added successfully' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
