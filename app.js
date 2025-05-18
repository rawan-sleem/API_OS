//! Importing required modules
const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();

//! Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

//! Connect to MongoDB
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/todo")
  .then(() => {
    console.log("Connected to MongoDB is successful ✅✅");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//! Define a TODO schema & model 

const todoSchema = new mongoose.Schema({
  task: String,
  done: Boolean,
});


const Todo = mongoose.model("Todo", todoSchema);

//SECTION - API Endpoints
//! GET ALL 

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: err.message });
  }
});

//! POST 

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }
  try {
    const newTodo = new Todo({ task, done: false });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ message: err.message });
  }
});

// !GET by ID 

app.get("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error("Error fetching todo:", err);
    res.status(500).json({ message: err.message });
  }
});

//! DELETE by ID 

app.delete("/todos/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(204).end(); // No content to send back
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: err.message });
  }
});

// ! PUT (Update) by ID

app.put("/todos/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: err.message });
  }
});

// ! Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
