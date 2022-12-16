class ContactController {
  //METHOD POST
  //ROUTE /api/contact

  static saveContact = async (req, res, next) => {
    try {
      console.log(req.body);
      const requiredFields = []
      res.status(201).json(req.body);
    } catch (err) {
      next(err);
    }
  };

  //METHOD GET
  //ROUTE /api/contact

  static fetchContacts = async (req, res, next) => {
    try {
      console.log(req.body);
      res.status(201).json("from fetch contact");
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
