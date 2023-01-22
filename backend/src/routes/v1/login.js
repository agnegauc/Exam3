import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { MYSQL_CONFIG, jwtSecret } from "../../config.js";

const router = express.Router();

const userSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post("/", async (req, res) => {
  let userData = req.body;
  const expiresIn = 60;
  const issuedAt = new Date().getTime();

  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ error: "Incorect email and / or password." })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const [userByEmail] = await con.execute(
      `SELECT * FROM users WHERE email=${mysql.escape(userData.email)}`
    );

    await con.end();

    // Jei nėra nė vieno vartotojo:
    if (userByEmail.length === 0) {
      return res
        .status(400)
        .send({ error: "User with this email address does not exist." })
        .end();
    }

    const isAuthed = bcrypt.compareSync(
      userData.password,
      userByEmail[0].password
    );

    if (isAuthed) {
      const token = jwt.sign({ id: userByEmail[0].id, issuedAt }, jwtSecret, {
        algorithm: "HS256",
        expiresIn,
      });

      return res.send({ message: "Login successful!", token }).end();
    }

    return res
      .status(400)
      .send({ error: "Incorect email and / or password." })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
  }
});

export default router;
