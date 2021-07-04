const router = require("express").Router();
const { createRole, getRole } = require("../controllers/rolesController");
const { body } = require("express-validator");
const isLoggedIn = require("../middlewares/isLogin");
const hasPermission = require("../middlewares/hasPermission");

router.post("/", body("name").notEmpty(), createRole);
router.get("/", isLoggedIn, hasPermission, getRole);

module.exports = router;
