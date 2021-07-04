const router = require("express").Router();
const {
  createSchool,
  getSchools,
  getStudents,
} = require("../controllers/schoolController");
const { check } = require("express-validator");
const isLoggedIn = require("../middlewares/isLogin");
const hasPermission = require("../middlewares/hasPermission");

router.post(
  "/",
  check("name")
    .isLength({ min: 3 })
    .withMessage("must be atleast 3 characters long"),
  check("state").notEmpty().withMessage("State is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("country").notEmpty().withMessage("Country is required"),
  isLoggedIn,
  hasPermission,
  createSchool
);
router.get("/", isLoggedIn, hasPermission, getSchools);
router.get("/students", isLoggedIn, hasPermission, getStudents);

module.exports = router;
