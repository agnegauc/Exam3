import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG, jwtSecret } from "../../config.js";

const router = express.Router();

const accountSchema = Joi.object({
  group_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

router.post("/", async (req, res) => {
  let { group_id } = req.body;
  const payload = jwt.verify(
    req.headers.authorization?.split(" ")[1],
    jwtSecret
  );
  const user_id = payload.id;

  try {
    await accountSchema.validateAsync({ group_id, user_id });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Incorrect group id provided" }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO accounts (group_id, user_id) VALUES (${mysql.escape(
        group_id
      )},${mysql.escape(user_id)})`
    );

    await con.end();

    return res
      .status(201)
      .send({ message: "New group successfully assigned." })
      .end();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Unexpected error. Please try again" })
      .end();
  }
});

router.get("/", async (req, res) => {
  const payload = jwt.verify(
    req.headers.authorization?.split(" ")[1],
    jwtSecret
  );
  const userId = payload.id;

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const userGroups = await con.execute(
      `SELECT accounts.group_id,Exam3.groups.name FROM accounts JOIN Exam3.groups ON (accounts.group_id=Exam3.groups.id) WHERE accounts.user_id=${userId}`
    );

    await con.end();

    return res.send(userGroups[0]).end();
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
    return console.error(error);
  }
});

export default router;
