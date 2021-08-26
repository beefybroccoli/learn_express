import express from "express";
import routes from "./src/routes/crmRoutes";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

//------------mongoose connection----------------
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//------------body parser-------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, response) => {
  response.send("you are on the home page");
});

routes(app);

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
