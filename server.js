const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


// Home Route
app.get("/", (req, res) => {
    res.send("Iron Knight Fitness Backend Running");
});


// Get All Members
app.get("/members", (req, res) => {
    db.all("SELECT * FROM members", [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });
});


// Add Member
app.post("/members", (req, res) => {
    const {
        name,
        phone,
        email,
        plan,
        join_date,
        expiry_date
    } = req.body;

    db.run(
        `INSERT INTO members
        (name, phone, email, plan, join_date, expiry_date)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [name, phone, email, plan, join_date, expiry_date],
        function (err) {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Member added successfully",
                id: this.lastID
            });
        }
    );
});


// Test Route
app.get("/add-test-member", (req, res) => {

    db.run(
        `INSERT INTO members
        (name, phone, email, plan, join_date, expiry_date)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            "Swati",
            "9876543210",
            "swati@gmail.com",
            "Premium",
            "2026-07-05",
            "2026-08-05"
        ],
        function(err) {

            if (err) {
                return res.send(err.message);
            }

            res.send("Member Added");
        }
    );
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});