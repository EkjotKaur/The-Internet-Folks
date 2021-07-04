const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const keys = require("./config/keys");

const userRouter = require("./routers/userRouter");
const roleRouter = require("./routers/rolesRouter");
const studentRouter = require("./routers/studentRouter");
const schoolRouter = require("./routers/schoolRouter");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

mongoose
  .connect(keys.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

mongoose.set("useCreateIndex", true);

app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/student", studentRouter);
app.use("/school", schoolRouter);

const port = process.env.PORT || 5000;

http.listen(port, () => console.log("Listening"));
