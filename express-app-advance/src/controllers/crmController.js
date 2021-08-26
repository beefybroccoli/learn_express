import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = (req, res) => {
  let newContact = new Contact(req.body);

  newContact.save((error, contact) => {
    if (error) {
      res.send(error);
    } else {
      res.json(contact);
    }
  });
};

export const getContacts = (req, res) => {
  Contact.find({}, (error, contact) => {
    if (error) {
      res.send(error);
    } else {
      res.json(contact);
    }
  });
};

export const getContactByID = (req, res) => {
  Contact.findById(req.params.contactID, (error, contact) => {
    if (error) {
      res.send(error);
    } else {
      res.json(contact);
    }
  });
};

export const updateContact = (req, res) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactID },
    req.body,
    { new: true, useFindAndModify: false },
    (error, contact) => {
      if (error) {
        res.send(error);
      } else {
        res.json(contact);
      }
    }
  );
};

export const deleteContact = (req, res) => {
  Contact.remove({ _id: req.params.contactID }, (error, contact) => {
    if (error) {
      res.send(error);
    } else {
      res.json({ message: "successfully deleted contact" });
    }
  });
};
