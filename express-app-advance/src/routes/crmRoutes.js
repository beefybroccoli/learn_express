import {
  addNewContact,
  getContacts,
  getContactByID,
  updateContact,
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
    .post(addNewContact);

  // .post((req, rep) => {
  //   rep.send("POST request successful!");
  // });

  app
    .route("/contact/:contactID")
    .get(getContactByID)
    .put(updateContact)
    .post((req, rep) => {
      rep.send("POST request successful!");
    })
    .delete((req, rep) => {
      rep.send("DELETE request successful!");
    });
};

export default routes;
