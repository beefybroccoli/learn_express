import express from "express";
import data from "./data/MOCK_DATA.json";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("express-app-sample at port ", PORT);
  console.log(data);
});
