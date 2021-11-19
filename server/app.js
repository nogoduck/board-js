const nunjucks = require("nunjucks");
const mongoose = require('mongoose');
const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const path = require("path");
const app = express();

const indexRouter = require("./routes/index");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/")));
app.set("port", process.env.PORT || 8004);
app.set("view engine", "html");

nunjucks.configure("views", {
    express: app,
    watch: true,
});

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('MongoDB Connected...');
    })
    .catch((err) => console.log(err));




app.use("/", indexRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
});
