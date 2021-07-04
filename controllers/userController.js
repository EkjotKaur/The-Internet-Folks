const User = require("../models/userModel.js");
const Role = require("../models/rolesModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.signup = async (req, res) => {
  let foundRole;
  try {
    foundRole = await Role.findById(req.body.roleId);
    if (!foundRole) {
      res.status(404).json({ status: false, message: "Cannot find role" });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong", err: err }],
    });
  }

  let foundUser;
  try {
    foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      res
        .status(404)
        .json({ status: false, errors: [{ message: "Email already exists" }] });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong", err: err }],
    });
  }
  const newUser = new User({
    ...req.body,
    roleId: foundRole,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: "false",
          errors: [{ message: "Something went wrong" }],
        });
      }
      newUser.password = hash;

      newUser
        .save()
        .then((user) => {
          return res.status(200).json({
            success: "true",
            contents: { data: user },
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            success: "false",
            errors: [{ message: "Something went wrong", err: err }],
          });
        });
    });
  });
};

exports.login = async (req, res) => {
  let foundUser;
  try {
    foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      res
        .status(422)
        .json({ status: false, message: "Invalid email or password" });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        status: false,
        errors: [{ message: "Something went wrong", err: err }],
      });
  }

  bcrypt
    .compare(req.body.password, foundUser.password)
    .then((doesMatched) => {
      if (!doesMatched) {
        return res.status(422).json({
          success: "false",
          message: "Incorrect email or password",
        });
      }
      const token = jwt.sign(
        {
          data: foundUser._id,
        },
        keys.JWT_SECRET,
        {}
      );

      res
        .status(200)
        .json({ status: true, contents: { data: foundUser, token } });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: "false",
        errors: [{ message: "Something went wrong" }],
      });
    });
};

exports.getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({ status: true, contents: { data: users } });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({
          status: false,
          errors: [{ message: "Something went wrong", err: err }],
        });
    });
};

exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((users) => {
      res.status(200).json({ status: true, contents: { data: users } });
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          status: false,
          errors: [{ message: "Something went wrong", err: err }],
        });
    });
};
