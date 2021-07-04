const School = require("../models/schoolModel");
const Students = require("../models/studentModel");

exports.createSchool = (req, res) => {
  const school = new School({
    ...req.body,
  });

  school
    .save()
    .then((savedSchool) => {
      res.status(200).json({ status: true, contents: { data: savedSchool } });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ status: false, errors: [{ message: "Something went wrong" }] });
    });
};

exports.getSchools = (req, res) => {
  School.find()
    .then((schools) => {
      return res
        .status(200)
        .json({ status: true, contents: { data: schools } });
    })
    .catch((err) => {
      return res
        .status(500)
        .json({ status: false, errors: [{ message: "Something went wrong" }] });
    });
};

exports.getStudents = async (req, res) => {
  let foundSchools;
  try {
    foundSchools = await School.find();
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, errors: [{ message: "Something went wrong" }] });
  }

  let foundStudents = foundSchools.map(async (school) => {
    let students;
    try {
      students = await Student.find({ schoolId: school._id });
    } catch (err) {
      return null;
    }

    const schoolObj = {
      ...school._doc,
      students,
    };

    return schoolObj;
  });

  let data = await Promise.all(foundStudents);
  data = data.filter((s) => s != null);

  return res.status(200).json({ status: true, contents: { data: data } });
};
