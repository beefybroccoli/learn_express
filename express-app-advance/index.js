import express from "express";
import routes from "./src/routes/crmRoutes";

const app = express();
const PORT = 3000;

app.get("/", (req, response) => {
  response.send("you are on the home page");
});

routes(app);

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
