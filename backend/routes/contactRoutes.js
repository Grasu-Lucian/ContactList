const express = require("express");
const router = express.Router();
const { createContacts ,deleteContacts,updateContacts, getContact,getContacts} = require("../controllers/contactControllers");
const { protect } = require("../middleware/authMiddleware");
router.route("/").post(protect, createContacts).get(protect,getContacts);
router.route("/:id").delete(protect,  deleteContacts).put(protect,  updateContacts).get(protect,getContact);
module.exports = router;
