import userService from "../services/userService.js";
import bcrypt from "../utils/bcrypt.js";

function getUsers(req, res) {
  userService.getUsers().then((result) => res.send(result));
}

function createUser(req, res) {
  const { user } = req;

  user.activated = true;

  bcrypt
    .hashPassword(user.password)
    .then((hashedPassword) => {
      user.password = hashedPassword;
      console.log("userController");
      console.log(user);
      return userService.postUser(user);
    })
    .then((result) => {
      console.log("userController");
      console.log("After");
      res.send(result);
    })
    .catch((error) => res.send(error));
}

export default { getUsers, createUser };
