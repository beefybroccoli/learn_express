import express from "express";
import MOCK_DATA from "./MOCK_DATA.json";

const app = express();
const PORT = 3000;

const path_get = "/";
app.get(path_get, (request, response) => {
  //   response.send(`a get request with ${path} route on port ${PORT}`);

  //get data from source (ie. database, API call)

  //return data to front end
  response.json(MOCK_DATA);
});

const path_post = "/newItem";
app.post(path_post, (request, response) => {
  response.send(`a get request with ${path_post} route on port ${PORT}`);
});

const path_put = "/item";
app.put(path_put, (request, response) => {
  response.send(`a put request with ${path_put} route on port ${PORT}`);
});

const path_delete = "/item";
app.delete(path_delete, (request, response) => {
  response.send(`a delete request with ${path_delete} route on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your sever is running on port ${PORT}`);
  console.log(MOCK_DATA[0]);
  console.log("MOCK_DATA.length = ", MOCK_DATA.length);
  console.log("========================================");
});

/*********
 * serving resources via public  path
 */
const folder_public = "public";
app.use(express.static(folder_public));
//load with this url, http://localhost:3000/tent.jpg

/**
 * serving resources via other path
 */
const path_image = "/images";
app.use(path_image, express.static("images"));
//load with this url, http://localhost:3000/images/rocket.jpg
