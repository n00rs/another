const router = require("express").Router();
const {
  ContactController: { fetchContacts, deleteContact, saveContact, updateContact },
} = require("../controller/contact");

router.get("/", fetchContacts);

router.post("/", saveContact);

router.delete("/", deleteContact);

router.put("/", updateContact);

module.exports = router;
 