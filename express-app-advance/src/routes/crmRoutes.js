import {
  addNewContact,
  getContacts,
  getContactByID,
  updateContact,
  deleteContact,
} from "../controllers/crmController";

const routes = (app) => {
  app
    .route("/contact")
    .get((req, rep, next) => {
      //----------middleware-----------------
      console.log(`Request from: ${req.originalUrl}`);
      console.log(`Request tye: ${req.method}`);
      next();
      //----------middleware-----------------
    }, getContacts)
    //POST endpoint
    .post(addNewContact);

  app
    .route("/contact/:contactID")
    //get a specific contact
    .get(getContactByID)
    //update a specific contact
    .put(updateContact)
    //delete a specific contact
    .delete(deleteContact);
};

export default routes;
