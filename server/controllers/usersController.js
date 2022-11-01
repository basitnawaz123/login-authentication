const users = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const fetchUsers = async (req, res) => {
  try {
    let result = await users.find({});
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No record found!",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: error.message,
    });
  }
};

const addUser = async (req, res) => {
  const { password, name, email } = req.body;
  const salt = await bcrypt.genSalt(10);
  const usersData = new users({
    name,
    email,
    password: await bcrypt.hash(password, salt),
  });
  const result = await usersData.save();
  if (result) {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userData = await users.findOne({ email });
  if (!userData) {
    res.status(400).send(`Record not found against your email ${email}`);
  } else {
    bcrypt.compare(password, userData.password, (err, result) => {
      if (result) {
        var token = jwt.sign(
          {
            _id: userData._id,
            email: userData.email,
            name: userData.name,
            auth: true,
          },
          process.env.JWT_SECRET
        );

        res.status(200).json({
          success: true,
          message: "Logged In Successfully",
          token: token,
        });
      } else {
        res.status(500).json({ message: "Your Password is Incorrect" });
      }
    });
  }
};

module.exports = {
  fetchUsers,
  addUser,
  login,
};
