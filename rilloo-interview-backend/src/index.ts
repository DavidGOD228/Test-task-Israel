import express = require("express");
import cors = require("cors");
import fs = require("fs/promises");
import users = require("./data/users.json");
import todos = require("./data/todos.json");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/login", async (req, res) => {
  const body = req.body;
  const { username, password } = body;
  const user = users.find((user) => user.name === username);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  if (user.password !== password) {
    res.status(401).send("Invalid password");
    return;
  }
  res.send(user);
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userId = parseInt(id);
    const user = users.find((user) => user.id === userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    const { password, ...rest } = user;
    res.send(rest);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.get("/todos/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const userTodos = todos.filter((todo) => todo.userId === parseInt(userId));
    res.send(userTodos);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.get("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todoId = parseInt(id);
    const todo = todos.find((todo) => todo.id === todoId);
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    res.send(todo);
  } catch (error) {
    res.status(404).send("Todo not found");
  }
});

app.post("/todo", async (req, res) => {
  const { body } = req;
  const { userId, title, completed } = body;
  const todo = {
    id: Date.now() + Math.floor(Math.random() * 1000000),
    userId,
    title,
    completed,
  };
  todos.push(todo);
  await fs.writeFile(__dirname + "/data/todos.json", JSON.stringify(todos));
  res.send(todo);
});

app.put("/todo/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const todoId = parseInt(id);
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      res.status(404).send("Todo not found");
      return;
    }
    const updatedTodo = { ...todos[todoIndex], ...body };
    todos[todoIndex] = updatedTodo;
    await fs.writeFile(__dirname + "/data/todos.json", JSON.stringify(todos));
    res.send(updatedTodo);
  } catch (error) {
    res.status(404).send("Todo not found");
  }
});

app.delete("/todo/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todoId = parseInt(id);
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex === -1) {
      res.status(404).send("Todo not found");
      return;
    }
    todos.splice(todoIndex, 1);
    await fs.writeFile(__dirname + "/data/todos.json", JSON.stringify(todos));
    res.send(todos);
  } catch (error) {
    console.log(error);
    res.status(404).send("Todo not found");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
