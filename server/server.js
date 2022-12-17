const env = require("dotenv").config();
const express = require("express");
const { connect } = require("./config/mongodb");
const path = require("path");
const app = express();
const { PORT } = process.env;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
connect();

app.use("/api/contact", require("./routes/contactMongo"));

if (process.env.NODE_ENV === "production") {
  // app.use(express.static("client/build"));
  // app.use(express.static(path.resolve(__dirname, "client", "build")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}
app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode ? err.statusCode : 500;
  res.status(statusCode).json({ message: err.message });
});

app.listen(PORT , () => console.log(`server running at PORT :${PORT}`));
