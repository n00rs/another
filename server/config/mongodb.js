const { MongoClient } = require("mongodb");

const { MONGO_URL } = process.env;
console.log(MONGO_URL);
const client = new MongoClient(MONGO_URL);
const dbName = "bitroot";
let db;

const connect = async () => {
  try {
    const con = await client.connect();
    // console.log(con);
    db = client.db(dbName);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = { connect, db };
