const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModal");
const User = require("../models/userModal");
const createContacts = asyncHandler(async (req, res) => {
  //get user using the id in the JWT
  const user = await User.findById(req.user.id);
  const { name, email, phone } = req.body;
  if (email) {
    const doc = await Contact.find({
      $and: [{ email: email }, { user: req.user.id }],
    });
    if(doc.length>0){
      res.status(400);
      throw new Error("Email already in use ");
     }
  }
  if (phone) {
    const boc = await Contact.find({
      $and: [{ phone: phone }, { user: req.user.id }],
    });
    if(boc.length>0){
      res.status(400);
      throw new Error("Phone already in use ");
     }
  }
  if (!name) {
    res.status(400);
    throw new Error("Please add a  name a description ");
  }
  if (!user) {
    res.status(401);
    throw new Error("User not found ");
  }
  const contact = await Contact.create({
    user: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});
const getContact = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  res.status(200).json(contact);
});
const deleteContacts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  await contact.remove();
  res.status(200).json({ succes: true });
});
const updateContacts = asyncHandler(async (req, res) => {
  console.log("e");
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});
const getContacts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found ");
  }
  const contacts = await Contact.find({ user: req.user.id });
  res.status(200).json(contacts);
});
module.exports = {
  createContacts,
  deleteContacts,
  updateContacts,
  getContact,
  getContacts,
};
