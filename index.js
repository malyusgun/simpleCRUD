import http from "http";
import dotenv from "dotenv";
import {
  getUsersController,
  getUserController,
  addUserController,
} from "./controllers/users.ts";

dotenv.config();
const PORT = process.env.PORT || 4000;
let data = [];

const server = http.createServer((request, response) => {
  request.on("data", (chunk) => {
    console.log("chunk: ", chunk);
    data.push(chunk);
    console.log("request.url: ", request.url);
    console.log("request.method: ", request.method);
    const url = request.url;
    const body = data.at(-1);
    console.log("body: ", body);
    switch (request.method) {
      case "GET":
        if (url === "/users") {
          response = getUsersController(request, response);
          response.end();
          break;
        }
        if (url.startsWith("/users/")) {
          response = getUserController(request, response);
          response.end();
          break;
        }
        response.statusCode = 400;
        response.write(`CANNOT GET ${request.url}`);
        response.end();
        break;
      case "POST":
        if (url === "/users") {
          response = addUserController(request, response, body);
          response.end();
          break;
        }
        response.statusCode = 400;
        response.write(`CANNOT GET ${request.url}`);
        response.end();
        break;
    }
  });
});

server.listen(PORT, (request, response, err) => {
  err ? console.error(err) : console.log(`listening on port ${PORT}`);
});

server.on("request", (request, response) => {});
