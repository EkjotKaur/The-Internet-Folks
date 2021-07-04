const mongoose = require("mongoose");

const rolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    scope: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = Role = mongoose.model("role", rolesSchema);
