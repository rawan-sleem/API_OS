# 📝 ToDo List API

A simple RESTful To-Do List API built using **Node.js**, **Express**, and **MongoDB**.
This project allows users to create, view, update, and delete tasks from a to-do list.


---

## 📌 Project Description

This API manages a list of tasks using MongoDB as the database and Express as the server framework. The app supports full CRUD (Create, Read, Update, Delete) operations .

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js and npm installed
* MongoDB (local or Docker)

---

### 🔧 Installation Steps

1. **Install dependencies**
  npm init -y
  npm i express
  npm i mongoose

2. **Create a `.env` file** (in the root directory) and add:

   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/todo
   ```

   > If using Docker, use:
   > `MONGO_URI=mongodb://mongo:27017/todo`

4. **Start the server**

   ```bash
   npm start
   ```

5. **Server will be running at**:

   ```
   http://localhost:3000
   ```

---

## 📬 API Endpoints

### 🔹 Get all todos

* **GET** `/todos`
* Returns all to-do items.

### 🔹 Create a new todo

* **POST** `/todos`
* JSON Body:

  ```json
  {
    "task": "Your task here"
  }
  ```

### 🔹 Get a single todo by ID

* **GET** `/todos/:id`

### 🔹 Update a todo by ID

* **PUT** `/todos/:id`
* JSON Body (example):

  ```json
  {
    "task": "Updated task",
    "done": true
  }
  ```

### 🔹 Delete a todo by ID

* **DELETE** `/todos/:id`

---

## 🧪 Sample Response

```json
{
  "_id": "662bb7fe1b2c7f3456c1a7e4",
  "task": "Finish homework",
  "done": false,
  "__v": 0
}
```

---

## 📦 Technologies Used

* Node.js
* Express
* MongoDB
* Mongoose



## Build app on docker 
docker network create my-network

docker run -d --name mongo --network my-network -p 27017:27017 mongo

docker build -t todo .

docker run -d -p 3070:3000 --name todo --network my-network todo
