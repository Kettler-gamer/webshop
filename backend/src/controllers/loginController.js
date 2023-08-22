import bcrypt from "../utils/bcrypt.js";
import loginService from "../services/loginService.js";
import jwtUtil from "../utils/jwtUtil.js";

async function login(req, res) {
  const { username, password } = req.body;

  const result = await loginService.getUser(username);

  if (result.length !== 1) {
    res.status(400).send({ message: "Incorrect username or password!" });
    return;
  }

  const user = result[0];

  const match = await bcrypt.verifyPassword(password, user.password);

  if (!match) {
    res.status(400).send({ message: "Incorrect username or password!" });
    return;
  }

  const token = jwtUtil.createToken({
    username: user.username,
    role: user.role,
  });

  res.status(200).send({ message: "You logged in!", token });
}

export default { login };
