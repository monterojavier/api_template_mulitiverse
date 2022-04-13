const express = require("express");
//require basicAuth
const basicAuth = require("express-basic-auth");
//require bcrypt
const bcrypt = require("bcrypt");
// set salt
const saltRounds = 2;

const {User, Item} = require("./models");
const {use} = require("bcrypt/promises");

// initialise Express
const app = express();

// specify out request bodies are json
app.use(express.json());

// ROUTES GO HERE

// GET
app.get("/", (req, res) => {
  res.send("<h1>App Running</h1>");
});

// GET ALL USERS
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({users});
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
