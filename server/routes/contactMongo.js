const router = require("express").Router();
const {upload} = require("../config/aws");
const {
  ContactController: { fetchContacts, deleteContact, saveContact, updateContact },
} = require("../controller/contact");

router.get("/", fetchContacts);

router.post("/",upload.single('image'), saveContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContact);

module.exports = router;
 