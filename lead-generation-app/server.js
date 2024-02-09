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
    const query = 'CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, email TEXT, phone TEXT, message TEXT)';
    db.run(query);
});

app.post('/submit', (req, res) => {
    const { firstname, lastname, email, phone, message } = req.body;

    const query = 'INSERT INTO leads (firstname, lastname, email, phone, message) VALUES (?, ?, ?, ?, ?)'

    db.run(query, [firstname, lastname, email, phone, message], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        } else {
            res.status(201).send('Lead created successfully');
        }
    });
});

app.get('/getleads', (req, res) => {

    const query = 'SELECT * FROM leads'

    db.all(query, (err, rows) => {
        if (err) {
            res.status(500).send('Server Error');
        } else {
            res.status(200).json(rows);
        }
    });
});

app.delete('/deletelead/:id', (req, res) => {
    const itemId = req.params.id;

    const query = 'DELETE FROM leads WHERE id = ?';

    db.run(query, [itemId], function (err) {
      if (err) {
        console.error('Error deleting item:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (this.changes === 0) {
        // No rows were affected, meaning item with given ID doesn't exist
        return res.status(404).send('Item not found');
      }
      res.status(200).send('Item deleted successfully');
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));












