const Role = require("../models/rolesModel");
const { validationResult } = require("express-validator");

exports.createRole = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req);

  let foundRole;
  try {
    foundRole = await Role.findOne({ name: req.body.name });
    if (foundRole) {
      console.log();
      res
        .status(422)
        .json({ status: false, errors: [{ message: "Role already exists" }] });
    }
  } catch (err) {
    console.log(err);
  }

  const role = new Role({
    ...req.body,
  });

  role
    .save()
    .then((savedRole) => {
      res.status(200).json({ status: true, contents: { data: savedRole } });
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

exports.getRole = (req, res) => {
  Role.find()
    .then((roles) => {
      res.status(200).json({ status: true, contents: { data: roles } });
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
