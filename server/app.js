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

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/")));
app.set("PORT", process.env.PORT || 8004);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.use("/api", indexRouter);
app.use("/api/board", boardRouter);

app.listen(app.get("PORT"), () => {
  console.log("Connected PORT:", app.get("PORT"));
});
