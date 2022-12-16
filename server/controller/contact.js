const { awsUpload } = require("../config/aws");
const { db } = require("../config/mongodb");

class ContactController {
  //METHOD POST
  //ROUTE /api/contact

  static saveContact = async (req, res, next) => {
    console.log(req.body, req.file);
    try {
      const keys = Object.keys(req.body);
      const requiredField = [
        "first_name",
        "last_name",
        "phone",
        "email",
        "street",
        "city",
        "zipcode",
      ];
      const validate = requiredField.every((i) => keys.includes(i) && req.body[i] !== "");

      if (!validate) throw { statuCode: 403, message: "please provide required details" };

      if (req.file) {
        const fileName = Math.random().toString().replace(".", "") + req.file.originalname;

        const img = await awsUpload({ key: fileName, body: req.file.buffer });

        req.body.image = img;
      }

      const contact = {
        phone: [parseInt(req.body.phone)],
        address: {
          street: req.body?.street,
          city: req.body?.city,
          zipcode: req.body?.zipcode,
        },
        first_name: req.body?.first_name,
        last_name: req.body?.last_name,
        email: req.body?.email,
        image: req.body?.image,
      };

      //TODO CREATE INDEX FOR TEXT SEARCH

      db.collection("contacts").createIndex({ phone: 1 }, { unique: true });
      const { acknowledged } = await db.collection("contacts").insertOne(contact);
      if (acknowledged) res.status(201).json({ success: true, ...contact });
    } catch (err) {
      next(err);
    }
  };

  //METHOD GET
  //ROUTE /api/contact

  static fetchContacts = async (req, res, next) => {
    try {
      // console.log(req.body);
      const contacts = await db.collection("contacts").find().toArray();

      res.status(200).json(contacts);
    } catch (err) {
      next(err);
    }
  };

  //METHOD DELETE
  //ROUTE /api/contact

  static deleteContact = async (req, res, next) => {
    try {
      console.log(req.body);
      res.status(201).json("from delete contact");
    } catch (err) {
      next(err);
    }
  };

  //METHOD PUT
  //ROUTE /api/contact

  static updateContact = async (req, res, next) => {
    try {
      console.log(req.body);
      res.status(201).json("from update contact");
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { ContactController };
