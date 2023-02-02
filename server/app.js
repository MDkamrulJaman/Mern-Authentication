import "dotenv/config";
// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import "./db/dbconnection.js";
import router from "./routes/router.js";
import cors from "cors";
import cookiParser from "cookie-parser";

const app = express();

const port = 8009;

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`server start at port no : ${port}`);
});
