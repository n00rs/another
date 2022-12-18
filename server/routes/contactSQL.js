const router = require("express").Router();
const {
  newContact,
  fetchContacts,
  deleteContact,
  updateContact,
} = require("../controller/contactSql");

router.get("/", fetchContacts);

router.post("/", newContact);

router.delete("/:userId", deleteContact);

router.put("/:userId", updateContact);

module.exports = router;
