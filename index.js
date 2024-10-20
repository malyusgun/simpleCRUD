import http from "http";
import {
  getUsersController,
  getUserController,
  addUserController,
  editUserController,
  deleteUserController,
} from "./controllers/users.ts";
import { getEnvVariable } from "./helpers/index.js";

const PORT = (await getEnvVariable("PORT")) ?? 3000;
let data = [];
const server = http.createServer((request, response) => {
  request.on("data", (chunk) => {
    chunk = JSON.parse(chunk);
    data.push(chunk);
    const url = request.url;
    const body = data.at(-1);
    switch (request.method) {
      case "POST":
        try {
          if (url === "/users") {
            response = addUserController(response, body);
            response.end();
            break;
          }
          response.statusCode = 404;
          response.write(
            `Incorrect request (probably, this endpoint does not exist).`,
          );
          response.end();
        } catch (err) {
          response.statusCode = 500;
          response.write(`Internal server error: ${err.message}`);
        }
        break;
      case "PUT":
        try {
          if (url.startsWith("/users/")) {
            response = editUserController(request, response, body);
            response.end();
            break;
          }
          response.statusCode = 404;
          response.write(
            `Incorrect request (probably, this endpoint does not exist).`,
          );
          response.end();
        } catch (err) {
          response.statusCode = 500;
          response.write(`Internal server error: ${err.message}`);
        }
        break;
    }
  });
});

server.listen(PORT, (request, response, err) => {
  err ? console.error(err) : console.log(`listening on port ${PORT}`);
});

server.on("request", (request, response) => {
  const url = request.url;
  switch (request.method) {
    case "GET":
      try {
        if (url === "/users") {
          response = getUsersController(response);
          response.end();
          break;
        }
        if (url.startsWith("/users/")) {
          response = getUserController(request, response);
          response.end();
          break;
        }
        response.statusCode = 404;
        response.write(
          `Incorrect request (probably, this endpoint does not exist).`,
        );
        response.end();
      } catch (err) {
        response.statusCode = 500;
        response.write(`Internal server error: ${err.message}`);
      }
      break;
    case "DELETE":
      try {
        if (url.startsWith("/users/")) {
          response = deleteUserController(request, response);
          response.end();
          break;
        }
        response.statusCode = 404;
        response.write(
          `Incorrect request (probably, this endpoint does not exist).`,
        );
        response.end();
      } catch (err) {
        response.statusCode = 500;
        response.write(`Internal server error: ${err.message}`);
      }
      break;
  }
});
