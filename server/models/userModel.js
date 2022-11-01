const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter member Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter member Email"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = users = mongoose.model("users", userSchema);
