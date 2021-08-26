const routes = (app) => {
  app
    .route("/contact")
    .get((req, rep) => {
      rep.send("GET request successful!");
    })
    .post((req, rep) => {
      rep.send("POST request successful!");
    });

  app
    .route("/contact/:contactID")
    .put((req, rep) => {
      rep.send("PUT request successful!");
    })
    .post((req, rep) => {
      rep.send("POST request successful!");
    })
    .delete((req, rep) => {
      rep.send("DELETE request successful!");
    });
};

export default routes;
