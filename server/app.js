const config = require("./config/dev");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();

const indexRouter = require("./routes/index");
const boardRouter = require("./routes/board");
const userRouter = require("./routes/user");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(express.static(path.join(__dirname, "/views")));
app.use(express.urlencoded({ extended: false }));
app.set("PORT", process.env.PORT || 5005);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use("/", indexRouter);
app.use("/api/board", boardRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.listen(app.get("PORT"), () => {
  console.log("Connected PORT:", app.get("PORT"));
});
