const Student = require("../models/studentModel");
const User = require("../models/userModel");
const School = require("../models/schoolModel");

exports.createStudent = async (req, res) => {
  let foundUser;
  try {
    foundUser = await User.findById(req.body.userId);
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, errors: [{ message: "Something went wrong" }] });
  }
  if (!foundUser) {
    return res
      .status(404)
      .json({ status: false, errors: [{ message: "User not found" }] });
  }

  let foundSchool;
  try {
    foundSchool = await School.findById(req.body.schoolId);
  } catch (err) {
    return res.status(500).json({
      status: false,
      errors: [{ message: "Something went wrong", err: err }],
    });
  }

  if (!foundSchool) {
    return res
      .status(404)
      .json({ status: false, errors: [{ message: "User not found" }] });
  }

  const student = new Student({
    ...req.body,
    schoolId: foundSchool,
    userId: foundUser,
  });

  student
    .save()
    .then((student) => {
      return res
        .status(200)
        .json({ status: true, contents: { data: student } });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong", err: err }],
      });
    });
};

exports.getStudents = (req, res) => {
  Student.find()
    .then((users) => {
      return res.status(200).json({ status: true, contents: { data: users } });
    })
    .catch((err) => {
      return res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong", err: err }],
      });
    });
};
