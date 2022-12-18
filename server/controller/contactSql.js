const db = require("../config/postgres");

class ContactSQL {
  //METHOD POST
  //ROUTE /api/postgres

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

  //METHOD GET
  //ROUTE /api/postgres?page=&pageSize=&search=

  static fetchContacts = async (req, res, next) => {
    try {
      const page = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;
      const search = req.query.search;

      //TODO GET THE totalCount

      let query = `
      SELECT u.*,a.*,p.* FROM users AS u
       JOIN address AS a ON  u.id =  a.user_id
       JOIN phone_number AS p ON u.id = p.user_id
       LIMIT $1 OFFSET $2  
       `;
      let arr = [pageSize, (page - 1) * pageSize];
      if (search) {
        query = `
        SELECT u.*,a.*,p.* FROM users AS u
        JOIN address AS a ON  u.id =  a.user_id
        JOIN phone_number AS p ON u.id = p.user_id
        WHERE u.first_name ILIKE $1 OR u.last_name ILIKE $1 OR p.phone_number ILIKE $1
        LIMIT $2 OFFSET $3 
        `;
        arr = [`%${search}%`, pageSize, (page - 1) * pageSize];
      }

      const { rows } = await db.query(query, arr);

      if (rows.length < 1) throw { statusCode: 404, message: "no data available for this query" };

      res.status(200).json(rows);
    } catch (err) {
      next(err);
    }
  };

  //METHOD DELETE
  //ROUTE /api/postgres/:userId

  static deleteContact = async (req, res, next) => {
    try {
      // console.log(req.params);
      const { userId } = req.params;
      if (!userId) throw { statusCode: 422, message: "please provide valide details" };

      const query = `DELETE FROM users WHERE id=${userId}`;
      const { rowCount } = await db.query(query);
      if (rowCount !== 1) throw { statusCode: 400, message: "couldnt update th database" };

      res.status(200).json({ success: true, message: "user removed successfully" });
    } catch (err) {
      next(err);
    }
  };
  //METHOD DELETE
  //ROUTE /api/postgres/:userId

  static updateContact = async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!userId) throw { statusCode: 422, message: "please provide valide details" };

      console.log(req.body);
      const { first_name, last_name, street, city, zipcode, phone } = req.body;

      await db.query("BEGIN");
      // const updateQuery = `UPDATE users u
      // SET first_name =  COALESCE(NULLIF($1, ''), first_name),
      //  last_name =      COALESCE(NULLIF($2, ''), last_name)
      // FROM address a
      // WHERE u.id = a.user_id AND u.id = $3;

      // UPDATE address a
      // SET city = COALESCE(NULLIF($4,'') city),
      //     street = COALESCE(NULLIF($5,'') street),
      //     zip_code = COALESCE(NULLIF($6,'') zip_code)

      // FROM users u
      // WHERE u.id = a.user_id AND u.id = $3;`;

      const updateOne = await db.query(
        ` UPDATE users u
      SET first_name = COALESCE(NULLIF($1, ''), first_name),
          last_name = COALESCE(NULLIF($2, ''), last_name)
      FROM address a
      WHERE u.id = a.user_id AND u.id = $3
    `,
        [first_name, last_name, userId]
      );

      const updatetwo = await db.query(
        `UPDATE address a
      SET city = COALESCE(NULLIF($1, ''), city),
          street = COALESCE(NULLIF($2, ''), street),
          zip_code = COALESCE(NULLIF($4,''), zip_code)
      FROM users u
      WHERE u.id = a.user_id AND u.id = $3
    `,
        [city, street, userId, zipcode]
      );
      if (phone)
        await db.query(`INSERT INTO phone_number(user_id,phone_number) VALUES ($1,$2)`, [
          userId,
          phone,
        ]);
      // const update = await db.query(updateQuery, [
      //   first_name,
      //   last_name,
      //   userId,
      //   city,
      //   street,
      //   zipcode,
      // ]);

      console.log(updateOne, updatetwo);

      await db.query("COMMIT");
      res.status(200).json({ success: true });
    } catch (err) {
      await db.query("ROLLBACK");
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
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        street VARCHAR(200) NOT NULL,
        city VARCHAR(200) NOT NULL,
        zip_code INTEGER NOT NULL
    )`;
  await db.query(addressTableQuery);
  const phoneTableQuery = `CREATE TABLE IF NOT EXISTS phone_number(
    id serial PRIMARY KEY ,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) UNIQUE NOT NULL
  )`;
  await db.query(phoneTableQuery);
}

// `UPDATE users u
// SET first_name =  COALESCE(NULLIF($1, ''), first_name),
//  last_name =      COALESCE(NULLIF($2, ''), last_name)
// FROM address a
// WHERE u.id = a.user_id AND u.id = $3;

// UPDATE address a
// SET city = COALESCE(NULLIF($4,'') city),
//    street = COALESCE(NULLIF($5,'') street),
//    zip_code = COALESCE(NULLIF($6,'') zip_code)

// FROM users u
// WHERE u.id = a.user_id AND u.id = $3;`;
