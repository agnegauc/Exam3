import express from "express";
import Joi from "joi";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { MYSQL_CONFIG } from "../../config.js";

const router = express.Router();

const userSchema = Joi.object({
  full_name: Joi.string().trim().required(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().required(),
});

router.post("/", async (req, res) => {
  let userData = req.body;
  try {
    userData = await userSchema.validateAsync(userData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Incorect data sent" }).end();
  }

  try {
    const hashedPassword = bcrypt.hashSync(userData.password);

    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO users (full_name, email, password) VALUES (${mysql.escape(
        userData.full_name
      )},${mysql.escape(userData.email)}, '${hashedPassword}')`
    );

    await con.end();

    return res
      .status(201)
      .send({ message: "Registration successful. Please log in now." })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again" })
      .end();
  }
});

export default router;
