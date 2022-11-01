var express = require("express");
const {
  fetchUsers,
  addUser,
  login,
} = require("../controllers/usersController");

var router = express.Router();

router.get("/", fetchUsers);
router.post("/", addUser);
router.post("/login", login);

module.exports = router;
