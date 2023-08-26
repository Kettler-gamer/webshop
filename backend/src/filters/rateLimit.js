import RateLimit from "express-rate-limit";

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
});

export default limiter;
