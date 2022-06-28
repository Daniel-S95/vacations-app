const express = require("express");
const cors = require("cors");
const server = express();
const vacationsController = require("./controllers/vacation-controller");
const usersController = require("./controllers/users-controller");
const likesController = require("./controllers/liked-vacations-controller");
const loginFilter = require("./middleware/login-filter");

server.use(cors({ origin: "http://localhost:3000" }));

server.use(loginFilter());

server.use(express.json());

server.use("/users", usersController);
server.use("/vacations", vacationsController);
server.use("/likes", likesController);

server.listen(3001, () => { console.log("Listening on http://localhost:3001") });