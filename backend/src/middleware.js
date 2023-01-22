import jwt from "jsonwebtoken";
import { jwtSecret } from "./config.js";

export const isLoggedIn = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ error: "User unauthorised due to to no token." })
      .end();
  }

  try {
    jwt.verify(token, jwtSecret);

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ error: "Invalid token." }).end();
    }
    return res.status(400).send({ error: "Unexpected error." }).end();
  }
};
