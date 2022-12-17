const router = require("express").Router();
const { newContact, fetchContacts } = require("../controller/contactSql");

router.get("/", fetchContacts);
router.post("/", newContact);

module.exports = router;
