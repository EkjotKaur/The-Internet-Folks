const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "school",
    },
  },
  { timestamps: true }
);

module.exports = Student = mongoose.model("student", studentSchema);
