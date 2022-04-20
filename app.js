const express = require("express");
const cors = require("cors");
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
app.use(cors());

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

// GET SPECIFIC USERS
app.get("/api/users/:userId", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.send(user);
  } catch (err) {
    res.sendStatus(500);
  }
});

// POST NEW USER
app.post("/api/users", async (req, res) => {
  bcrypt.hash(req.body.password, 2, async function (err, encrypted) {
    try {
      if (err) throw err;
      // Create a new user, storing the hashed password
      const newUser = await User.create({
        user: req.body.user,
        password: encrypted,
      });
      res.json({newUser});
    } catch (err) {
      res.send(err);
    }
  });
});

app.put("/api/users/:userId", async (req, res) => {
  try {
    let updatedUser = await User.update(req.body, {
      where: {id: req.params.userId},
    });
    res.json({updatedUser});
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
