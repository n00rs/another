const router = require("express").Router();
const { newContact, fetchContacts, deleteContact } = require("../controller/contactSql");

router.get("/", fetchContacts);

router.post("/", newContact);

router.delete("/:userId", deleteContact);

module.exports = router;
