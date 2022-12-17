const { ObjectID } = require("bson");
const { Db } = require("mongodb");
const { awsUpload } = require("../config/aws");
const { db } = require("../config/mongodb");

class ContactController {
  //METHOD POST
  //ROUTE /api/contact

  static saveContact = async (req, res, next) => {
    // console.log(req.body, req.file);
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

      const contact = {
        phone: [req.body.phone],
        address: {
          street: req.body?.street,
          city: req.body?.city,
          zipcode: req.body?.zipcode,
        },
        first_name: req.body?.first_name,
        last_name: req.body?.last_name,
        email: req.body?.email,
      };
      if (req.file) {
        const fileName = Math.random().toString().replace(".", "") + req.file.originalname;

        // const p  = await awsUpload({ key: fileName, body: req.file.buffer });
        contact.image = await (await awsUpload({ key: fileName, body: req.file.buffer })).Location;

        // req.body.image = await img;
        // console.log(img);
      }

      console.log(contact);
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
      const pageNo = req.query.page || 1;
      const pageSize = req.query.pageSize || 10;
      const search = req.query.search || "";
      console.log(search);
      let matchQuery = { $match: {} };
      if (search)
        matchQuery = {
          $match: {
            $or: [
              { first_name: { $regex: search } },
              { last_name: { $regex: search } },
              { phone: { $regex: search } },
            ],
          },
        };

      const [contacts] = await db
        .collection("contacts")
        .aggregate([
          matchQuery,
          {
            $facet: {
              metadata: [
                { $count: "total_docs" },
                { $addFields: { totalPages: { $ceil: { $divide: ["$total_docs", pageSize] } } } },
              ],
              data: [{ $skip: (pageNo - 1) * pageSize }, { $limit: pageSize }],
            },
          },
        ])
        .toArray();

      res.status(200).json(contacts);
    } catch (err) {
      next(err);
    }
  };

  //METHOD DELETE
  //ROUTE /api/contact/:contactId

  static deleteContact = async (req, res, next) => {
    try {
      const { contactId } = req.params;
      console.log(contactId);
      if (!contactId) throw { statuCode: 422, message: "Missing required parameter: contactId" };

      const { deletedCount } = await db
        .collection("contacts")
        .deleteOne({ _id: ObjectID(contactId) });
      console.log(deletedCount);
      if (deletedCount === 1)
        res.status(200).json({ success: true, message: "contact has been removed successfully" });
      else throw new Error("opps something went wrong");
    } catch (err) {
      next(err);
    }
  };

  //METHOD PUT
  //ROUTE /api/contact/:contactId

  static updateContact = async (req, res, next) => {
    try {
      console.log(req.body);
      const { first_name, last_name, street, city, zipcode, phone } = req.body;
      const { contactId } = req.params;
      //checking whether new number nalready exist in data base
      if (phone) {
        const checkNumExists = await db.collection("contacts").find({ phone: phone }).toArray();
        if (checkNumExists.length) throw { statuCode: 400, message: "phone number already exists" };
      }
      const updateData = await db.collection("contacts").updateOne(
        { _id: ObjectID(contactId) },
        {
          $set: {
            first_name,
            last_name,
            "address.street": street,
            "address.city": city,
            "address.zipcode": parseInt(zipcode),
          },
          $push: { phone: { $each: [phone], $slice: -5 } },
        }
      );
      console.log(updateData);
      res.status(201).json(req.body);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { ContactController };
