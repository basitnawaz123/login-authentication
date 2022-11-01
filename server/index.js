const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Database Connected!");
});

var usersRouter = require("./routes/users");

app.get("/", (req, res) => {
  res.send("Login Auth with JWT");
});

app.use("/api/user", usersRouter);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
