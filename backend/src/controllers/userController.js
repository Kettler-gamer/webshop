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

      return userService.postUser(user);
    })
    .then((result) => {
      if (result[0].affectedRows === 1) {
        res.status(201).send({ message: "Account was created!" });
      } else throw new Error(result.code);
    })
    .catch((error) => {
      switch (error.code) {
        case "ER_DUP_ENTRY":
          res.status(400).send({ message: "That username is already taken!" });
          break;
        default:
          console.log(error);
          res
            .status(500)
            .send({ message: "Something went wrong!, Try again later!" });
      }
    });
}

export default { getUsers, createUser };
