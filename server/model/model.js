const mongoose = require("mongoose");

var user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: String,
  status: String,
});

var app = new mongoose.Schema({
  package: String,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  modifiedAt: Date,
  createdAt: {type: Date, default: new Date()},
  current_version: { type: String, unique: true },
  app_icon: { type: String },
});

const user_model = mongoose.model("user", user);
const app_model = mongoose.model("app", app);

module.exports = { user_model, app_model };
