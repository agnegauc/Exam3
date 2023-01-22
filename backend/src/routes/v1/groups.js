import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG, jwtSecret } from "../../config.js";

const router = express.Router();

const groupsSchema = Joi.object({
  name: Joi.string().required(),
});

router.post("/", async (req, res) => {
  let { name } = req.body;

  try {
    await groupsSchema.validateAsync({ name });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ error: "Incorrect group name provided" })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    await con.execute(
      `INSERT INTO Exam3.groups (name) VALUES (${mysql.escape(name)})`
    );

    await con.end();

    return res
      .status(201)
      .send({
        message:
          "New group successfully created. Please select new group from the dropdown list to add it to your account.",
      })
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
  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);
    const allGroups = await con.execute(`SELECT * FROM Exam3.groups`);

    await con.end();

    return res.send(allGroups[0]).end();
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unexpected error. Please try again." })
      .end();
    return console.error(error);
  }
});

export default router;
