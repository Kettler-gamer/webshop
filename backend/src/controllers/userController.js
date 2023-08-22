import userService from "../services/userService.js";

function getUsers(req, res) {
  userService.getUsers().then((result) => res.send(result));
}

export default { getUsers };
