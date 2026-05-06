import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 50, // limit each IP
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

export default rateLimiter;