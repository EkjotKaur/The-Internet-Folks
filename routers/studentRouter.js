const router = require("express").Router();
const {
  createStudent,
  getStudents,
} = require("../controllers/studentController");
const isLoggedIn = require("../middlewares/isLogin");
const hasPermission = require("../middlewares/hasPermission");

router.post("/", isLoggedIn, hasPermission, createStudent);
router.get("/", isLoggedIn, hasPermission, getStudents);

module.exports = router;
