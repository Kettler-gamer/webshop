function createUserFilter(req, res, next) {
  const { username, password } = req.body;

  const errors = [];

  if (username.length <= 3)
    errors.push("Username must be longer than 3 characters!");

  if (password.length <= 7)
    errors.push("Password must be 8 characters or longer!");

  if (errors.length === 0) {
    req.user = { username, password, activated: true };
    next();
  } else {
    res.status(400).send(errors);
  }
}

export default { createUserFilter };
