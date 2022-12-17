const { MongoClient } = require("mongodb");

const { MONGO_URL } = process.env;
console.log(MONGO_URL);
const client = new MongoClient(MONGO_URL);
// const client = new MongoClient('mongodb+srv://noor:wsA0wMq1qWCf0SMr@cluster0.mg0z8hv.mongodb.net/?retryWrites=true&w=majority')
const dbName = "bitroot";

const connect = async () => {
  try {
    const con = await client.connect();
    // console.log(con);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
const db = client.db("bitroot");

 module.exports = { connect, db };
