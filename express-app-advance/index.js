import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});

app.get("/", (req, response) => {
  response.send("you are on the home page");
});
