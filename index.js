const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

// Express app
const app = express();
app.use(cors());
app.use(express.json()); // Ensure JSON parsing

// MongoDB Connection
const CONNECTION_STRING = "mongodb+srv://paosubrecary:turt1H8KEED2fMnq@cluster0.pxeqz.mongodb.net/";
const DATABASENAME = "MyDb";
let database;

async function connectToDatabase() {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
        database = client.db(DATABASENAME);
        console.log("Connected to MongoDB Atlas successfully!");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}

// Call connection function
connectToDatabase();

// ROUTES

// GET all books
app.get('/api/books/GetBooks', async (req, res) => {
    try {
        const books = await database.collection("books").find({}).toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
});

// ADD a book
app.post('/api/books/AddBook', multer().none(), async (req, res) => {
    try {
        const numOfDocs = await database.collection("books").countDocuments();
        await database.collection("books").insertOne({
            id: (numOfDocs + 1).toString(),
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });
        res.json({ message: "Added Successfully" });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ error: "Failed to add book" });
    }
});

// DELETE a book
app.delete('/api/books/DeleteBook', async (req, res) => {
    try {
        const result = await database.collection("books").deleteOne({ id: req.query.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ message: "Deleted successfully!" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Failed to delete book" });
    }
});

// Start server
app.listen(5038, () => {
    console.log("Server is running on port 5038");
});
