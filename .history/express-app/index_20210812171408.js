import express from "express";
import MOCK_DATA from "./MOCK_DATA.json";

const app = express();
const PORT = 3000;

const path_post = "/post";
app.post(path_post, (request, response) => {
  response.send(`a get request with ${path_post} route on port ${PORT}`);
});

const path_put = "/put";
app.put(path_put, (request, response) => {
  response.send(`a put request with ${path_put} route on port ${PORT}`);
});

const path_delete = "/delete";
app.delete(path_delete, (request, response) => {
  response.send(`a delete request with ${path_delete} route on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your sever is running on port ${PORT}`);
  // console.log(MOCK_DATA[0]);
  console.log("MOCK_DATA.length = ", MOCK_DATA.length);
  console.log("========================================");
});

/**
 * @returns the whole MOCK_DATA file
 */
const path_root = "/";
app.get(path_root, (request, response) => {
  //   response.send(`a get request with ${path} route on port ${PORT}`);

  //get data from source (ie. database, API call)

  //return data to front end
  response.json(MOCK_DATA);
});

/*********
 * serving resources via public  path
 */
let folder_name = "public";
app.use(express.static(folder_name));
//load with this url, http://localhost:3000/tent.jpg

/**
 * serving resources via other path
 */
// this is for images folder on path images
folder_name = "images";
const path_image = path_root + folder_name;
app.use(path_image, express.static("images"));
//load with this url, http://localhost:3000/images/rocket.jpg

/**
 * serve resources with a parameter, like Netflix.com
 */
// const path_root = "/"; define above
const path_get = "/get/:";
const parameter_id = "id";
//"/get/:id"
app.get(path_get + parameter_id, (request, response) => {
  //   console.log(request.params.id); //return 04
  console.log("execute line 62");
  let id = Number(request.params.id);
  console.log(id); //return 4
  console.log(MOCK_DATA[id - 1]);

  response.send(MOCK_DATA[id - 1]);
});
// call http://localhost:3000/get/04
// return below
//   4
//   {
//     id: 4,
//     first_name: 'Madeline',
//     last_name: 'Lamprecht',
//     email: 'mlamprecht3@jalbum.net',
//     gender: 'Genderfluid'
//   }

const path_two_parameters = "/get/:category/:id";
app.get(path_two_parameters, (request, response) => {
  console.log(request.params.category);
  console.log(request.params.id);
  let id = Number(request.params.id);
  console.log(id); //return 4
  console.log(MOCK_DATA[id - 1]);
  // http://localhost:3000/get/old/100
  // http://localhost:3000/get/young/99
  response.send(MOCK_DATA[id - 1]);
});

const cb_error_handling = (request, response) => {
  console.log("Did you get the right data?");
};

const cb_response_id = (request, response, next) => {
  console.log("execute line 98");
  //   console.log(request.params.id); //return 04
  let id = Number(request.params.id);
  //   console.log(id); //return 4
  console.log(MOCK_DATA[id - 1]);

  response.send(MOCK_DATA[id - 1]);
  return next(); //next, jump to the next function
};

/**
 * only one response per call
 */
const path_parameter_ = "/get/:id";
//"gender":"Male"
//"first_name":"Brady"
//"last_name":"Naris"
//"id":98,
//"email":"bcorbally2p@ustream.tv"
console.log("============================================");
app.get(path_parameter_, cb_response_id, cb_error_handling);

app.get('/item/:id', (req, res, next) => {
  console.log(req.params.id);
  let user = Number(req.params.id);
  console.log(user);
  console.log(data[user]);
  res.send(data[user]);
  next();
}, (req, res) =>
  console.log('Did you get the right data?')
);

app.route('/item')
  .get((req, res) => {
      //res.download('images/rocket.jpg')
      //res.redirect('http://www.linkedin.com')
      //res.end()
      res.send(`a get request with /item route on port ${PORT}`)
  })
  .put((req, res) =>
      res.send(`a put request with /newItem route on port ${PORT}`)
  )
  .delete((req, res) =>
      res.send(`a delete request with /item route on port ${PORT}`)
);