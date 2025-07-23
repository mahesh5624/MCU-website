// // Import required modules
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Initialize Express application
// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// const MONGO_URI = 'mongodb://localhost:27017/marvelDB'; // Replace with your MongoDB URI
// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define a Mongoose schema for the contact form
// const contactSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     message: {
//         type: String,
//         required: true
//     },
//     submittedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Create a Mongoose model
// const Contact = mongoose.model('Contact', contactSchema);

// // Route to handle form submission
// app.post('/submit_form', async (req, res) => {
//     try {
//         const { name, email, message } = req.body;

//         // Validate input
//         if (!name || !email || !message) {
//             return res.status(400).json({ message: 'All fields are required.' });
//         }

//         // Create and save the contact document
//         const newContact = new Contact({ name, email, message });
//         await newContact.save();

//         res.status(200).json({ message: 'Thank you for contacting us!' });
//     } catch (error) {
//         console.error('Error saving contact:', error);
//         res.status(500).json({ message: 'An error occurred while submitting your message.' });
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/marvel_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

// Define Schema and Model
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// Routes
app.post("/submit_form", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(200).json({ message: "Thank you for your message!" });
    } catch (error) {
        console.error("Error saving to database:", error);
        res.status(500).json({ message: "Failed to save your message. Please try again later." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

