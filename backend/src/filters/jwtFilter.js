import jwtUtil from "../utils/jwtUtil.js";
import userService from "../services/userService.js";

function checkToken(req, res, next) {
  const token = req.headers.authorization;

  const payload = jwtUtil.verifyToken(token);

  if (!payload) {
    res.status(400).send({ message: "Invalid token!" });
  }

  userService.getUser(payload.username, payload.role).then((result) => {
    if (result.length !== 1) {
      res.status(400).send({ message: "Please! Log in again!" });
    } else {
      req.jwtPayload = payload;
      next();
    }
  });
}

function isAdmin(req, res, next) {
  if (req.jwtPayload.role === "ADMIN") {
    next();
  } else {
    res.status(401).send({ message: "You are not an administrator!" });
  }
}

export default { checkToken, isAdmin };
