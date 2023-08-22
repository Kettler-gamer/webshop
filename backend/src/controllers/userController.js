import userService from "../services/userService.js";

function getUsers(req, res) {
  userService.getUsers();
  res.send("Soon...");
}

export default { getUsers };
