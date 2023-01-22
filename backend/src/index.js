import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import login from "./routes/v1/login.js";
import register from "./routes/v1/register.js";
import accounts from "./routes/v1/accounts.js";
import bills from "./routes/v1/bills.js";
import groups from "./routes/v1/groups.js";
import { isLoggedIn } from "./middleware.js";

const app = express();

app.use(cors(), express.json());

app.use("/login", login);
app.use("/register", register);
app.use("/accounts", isLoggedIn, accounts);
app.use("/groups", isLoggedIn, groups);
app.use("/bills", bills);

app.get("/", (_, res) => {
  res.send({ message: "Server is running." }).end();
});

app.all("*", (_, res) => {
  res.status(404).send({ error: "Page not found." }).end();
});

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));
