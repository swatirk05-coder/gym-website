const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./gym.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to SQLite.");
    }
});

db.run(`
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT UNIQUE,
    email TEXT,
    plan TEXT,
    join_date TEXT,
    expiry_date TEXT
)
`);

module.exports = db;