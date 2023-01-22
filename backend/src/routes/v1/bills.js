import express from "express";
import Joi from "joi";
import mysql from "mysql2/promise";
import { MYSQL_CONFIG } from "../../config.js";

const router = express.Router();

const billSchema = Joi.object({
  group_id: Joi.number().required(),
  amount: Joi.number().required(),
  description: Joi.string().trim().required(),
});

router.get("/:group_id?", async (req, res) => {
  const groupId = +req.params?.group_id;

  if (groupId < 0 || Number.isNaN(groupId) || typeof groupId !== "number") {
    return res
      .status(400)
      .send({
        error: `Incorrect id provided. Please try again.`,
      })
      .end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `SELECT * FROM bills WHERE group_id= ${mysql.escape(groupId)}`
    );

    await con.end();

    res.status(200).send(result[0]).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
});

router.post("/", async (req, res) => {
  let billData = req.body; // group_id would be passed in body

  try {
    billData = await billSchema.validateAsync(billData);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Incorect input." }).end();
  }

  try {
    const con = await mysql.createConnection(MYSQL_CONFIG);

    const result = await con.execute(
      `INSERT INTO bills (group_id,amount,description) VALUES (${mysql.escape(
        billData.group_id
      )},${mysql.escape(billData.amount)},${mysql.escape(
        billData.description
      )})`
    );

    await con.end();

    res.status(200).send({ message: "New bill added successfully!" }).end();
  } catch (error) {
    res.status(500).send(error).end();
    return console.error(error);
  }
});

export default router;
