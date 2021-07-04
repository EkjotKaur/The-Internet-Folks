const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const User = require("../models/userModel");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res
      .status(401)
      .json({ status: false, errors: [{ message: "You must be logged in" }] });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: false,
        errors: [{ message: "you must be logged in" }],
      });
    }

    console.log(payload, "payload");

    const { data } = payload;
    console.log(data);
    User.findById(data)
      .then((userData) => {
        console.log(userData);
        req.user = userData;
        if (!userData) {
          return res.status(401).json({
            status: false,
            errors: [{ message: "you must be logged in" }],
          });
        }
        console.log(req.user, "USER");
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
