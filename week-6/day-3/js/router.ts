// const http = require('http');
import http from "http";
import url from "url";
import {
  createTask,
  getAllTasks,
  getTask,
  removeTask,
  update,
} from "./controller.ts";
export const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url || "", true);

  //GET endpoint
  if (reqUrl.pathname == "/tasks" && req.method === "GET") {
    console.log("Request type: " + req.method + "Endpoint: " + req.url);
    getAllTasks(req, res);
  } else if (reqUrl.pathname?.startsWith("/tasks/") && req.method == "GET") {
    console.log("Request type: " + req.method + "Endpoint: " + req.url);
    getTask(req, res);
  }

  //POST endpoint
  else if (reqUrl.pathname == "/tasks" && req.method === "POST") {
    console.log("Request type: " + req.method + "Endpoint: " + req.url);
    createTask(req, res);
  }

  //Delete endpoint
  else if (reqUrl.pathname?.startsWith("/tasks/") && req.method == "DELETE") {
    console.log("Request type: " + req.method + "Endpoint: " + req.url);
    removeTask(req, res);
  }

  //Patch endpoint
  else if (reqUrl.pathname?.startsWith("/tasks/") && req.method == "PATCH") {
    console.log("Request type: " + req.method + "Endpoint: " + req.url);
    update(req, res);
  }
});
