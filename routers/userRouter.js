const router = require("express").Router();
const {
  signup,
  login,
  getUsers,
  getUserById,
} = require("../controllers/userController");
const { check } = require("express-validator");
const isLoggedIn = require("../middlewares/isLogin");
const hasPermission = require("../middlewares/hasPermission");

router.post(
  "/signup",
  check("name")
    .isLength({ min: 3 })
    .withMessage("must be atleast 3 characters long"),
  check("email").isEmail().withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
  signup
);
router.post(
  "/signin",
  check("email").isEmail().withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
  login
);
router.get("/", isLoggedIn, hasPermission, getUsers);
router.get("/:id", isLoggedIn, hasPermission, getUserById);

module.exports = router;
