const db = require("../config/postgres");

class ContactSQL {
  static newContact = async (req, res, next) => {
    try {
      console.log(req.body);

      //TODO basic validation

      const createTable = await createTables(); //creating tables
      const { first_name, last_name, image, phone, email, street, city, zipcode } = req.body;

      //inserting data to userTable

      const insertUserQuery = `
      INSERT INTO users( first_name, last_name, image, email)
      VALUES ('${first_name}','${last_name}','${image}','${email}') RETURNING id;`;

      const {
        rows: [{ id }],
      } = await db.query(insertUserQuery);
      console.log(id);
      if (!id) throw { statusCode: 400, message: "oops something wrong in inserting " };

      //inserting data to addressTable

      const insertAddressQuery = `
      INSERT INTO address (user_id, street, city, zip_code) 
      VALUES(${id},'${street}','${city}',${zipcode})`;
      console.log(insertAddressQuery);
      const { rowCount } = await db.query(insertAddressQuery);
      console.log(rowCount);
      if (rowCount !== 1) throw { statusCode: 400, message: "oops something wrong in inserting " };

      const insertPhoneQuery = `
      INSERT INTO phone_number (user_id, phone_number) 
      VALUES('${id}','${phone}')`;

      const { rowCount: phoneRow } = await db.query(insertPhoneQuery);

      if (phoneRow !== 1) throw { statusCode: 400, message: "oops something wrong in inserting " };

      //   console.log(id, rowCount);

      res.status(201).json({ success: true });
    } catch (err) {
      next(err);
    }
  };

  static fetchContacts = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;
      const search = req.query.search;

      const query = `SELECT u.*,a.*,p.* FROM users AS u
       JOIN address AS a ON  u.id =  a.user_id
       JOIN phone_number AS p ON u.id = p.user_id
       LIMIT ${pageSize} OFFSET ${(page-1) * pageSize}
       `;

      const { rows } = await db.query(query);

      res.status(200).json(rows);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = ContactSQL;

async function createTables() {
  const userTableQuery = `CREATE TABLE IF NOT EXISTS users( 
        id serial PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        image VARCHAR(200) NOT NULL, 
        email VARCHAR(100) NOT NULL
    )`;
  await db.query(userTableQuery);
  const addressTableQuery = `CREATE TABLE IF NOT EXISTS address(
        id serial PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        street VARCHAR(200) NOT NULL,
        city VARCHAR(200) NOT NULL,
        zip_code INTEGER NOT NULL
    )`;
  await db.query(addressTableQuery);
  const phoneTableQuery = `CREATE TABLE IF NOT EXISTS phone_number(
    id serial PRIMARY KEY ,
    user_id INTEGER REFERENCES users(id),
    phone_number VARCHAR(20) UNIQUE NOT NULL
  )`;
  await db.query(phoneTableQuery);
}
