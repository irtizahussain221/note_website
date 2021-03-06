const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//using environment variables
const dotenv = require("dotenv");
dotenv.config();

const pathToReact = __dirname + "/views";

//connecting to database
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.kzsc5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then((_res) => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.log(error);
  });

const indexRouter = require("./routes/index");
const foldersRouter = require("./routes/folders");
const notesRouter = require("./routes/notes");

const app = express();

// view engine setup
app.use(express.static(pathToReact));

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/folders", foldersRouter);
app.use("/notes", notesRouter);

//Serving frontend react from express server
app.get("/*", (_req, res) => {
  res.sendFile(path + "/index.html");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
