const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors'); // Import the cors middleware
const app = express();

const dbPath = path.resolve(__dirname, 'database', 'leads.db');
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error('Error connecting to SQLite database: ', err);
	} else {
		console.log('Connected to SQLite database');
	}
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submissions
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create leads table
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, phone TEXT, message TEXT)");
});

app.post('/submit', (req, res) => {
    const { firstname, lastname, email, phone, message } = req.body;

    db.run('INSERT INTO leads (firstname, lastname, email, phone, message) VALUES (?, ?, ?, ?, ?)', [firstname, lastname, email, phone, message], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        } else {
            res.status(201).send('Lead created successfully');
        }
    });
});

app.get('/getleads', (req, res) => {
    db.all('SELECT * FROM leads', (err, rows) => {
        if (err) {
            res.status(500).send('Server Error');
        } else {
            res.status(200).json(rows);
        }
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));












