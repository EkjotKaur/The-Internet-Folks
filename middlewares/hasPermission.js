const Role = require("../models/rolesModel");

module.exports = async (req, res, next) => {
  console.log(req.baseUrl);
  const { baseUrl, method, originalUrl } = req;

  // console.log(req.user);
  // console.log(req);
  console.log(originalUrl);

  let foundRole;
  try {
    foundRole = await Role.findById(req.user.roleId);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      errors: [
        {
          message: "Something went wrong",
        },
      ],
    });
  }
  if (!foundRole) {
    res.status(401).json({
      status: false,
      errors: [
        {
          message: "Role not found",
        },
      ],
    });
  }
  console.log(foundRole);
  if (baseUrl === "/user") {
    if (foundRole.scopes.includes("user-get")) next();
    else {
      res.status(401).json({
        status: false,
        errors: [
          {
            message: "Don't have the required permission",
          },
        ],
      });
    }
  } else if (
    (originalUrl === "/school/students" || originalUrl === "/school/students/") &&
    method == "GET"
  ) {
    console.log("hello");
    if (foundRole.scopes.includes("school-students")) next();
    else {
      res.status(401).json({
        status: false,
        errors: [
          {
            message: "Don't have the required permission",
          },
        ],
      });
    }
  } else if (baseUrl === "/school" && method == "GET") {
    if (foundRole.scopes.includes("school-get")) next();
    else {
      res.status(401).json({
        status: false,
        errors: [
          {
            message: "Don't have the required permission",
          },
        ],
      });
    }
  } else if (baseUrl === "/school" && method == "POST") {
    if (foundRole.scopes.includes("school-create")) next();
    else {
      res.status(401).json({
        status: false,
        errors: [
          {
            message: "Don't have the required permission",
          },
        ],
      });
    }
  } else if (baseUrl === "/role" && method == "GET") {
    if (foundRole.scopes.includes("role-get")) next();
    else {
      res.status(401).json({
        status: false,
        errors: [
          {
            message: "Don't have the required permission",
          },
        ],
      });
    }
  } else if (baseUrl === "/student" && method == "POST") {
    if (foundRole.scopes.includes("student-create")) next();
    else {
      res.status(401).json({
        status: false,
        errors: [
          {
            message: "Don't have the required permission",
          },
        ],
      });
    }
  } else if (baseUrl === "/student" && method == "GET") {
    if (foundRole.scopes.includes("student-get")) next();
    else {
      res.status(401).json({
        status: false,
        errors: [
          {
            message: "Don't have the required permission",
          },
        ],
      });
    }
  }
  //   next();
};
