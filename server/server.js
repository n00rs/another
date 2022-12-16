const env = require("dotenv").config();
const express = require("express");
const { connect } = require("./config/mongodb");
const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connect()




app.listen(PORT, () => console.log(`server running at PORT :${PORT}`));
