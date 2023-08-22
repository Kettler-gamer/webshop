import userService from "../services/userService.js";

function getUsers(req, res) {
  userService.getUsers().then((result) => res.send(result));
}

function createUser(req, res) {
  userService
    .postUser(req.user)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => res.send(error));
}

export default { getUsers, createUser };
