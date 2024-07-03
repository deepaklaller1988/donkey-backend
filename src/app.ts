import dotenv from "dotenv";
// dotenv.config({ path: '.env.local' });
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

console.log(process.env.NODE_ENV);

import express, { Request, Response } from "express";
import sequelize from "./util/dbConn"
import cors from "cors";

import errorMiddleware from "./middleware/error";
import setInterface from "./middleware/interface";
import user from "./router/user/index"


const app = express();
app.use(express.json({ limit: '2450mb' }));
app.use(express.urlencoded({ extended: true }));
var corsOptions = {
  origin: function (origin: any, callback: any) {
    callback(null, true);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(setInterface);
//check connection to database
const connectToDb = async () => {
  const data = await sequelize.sync({ force: false })
  try {
    await sequelize.authenticate();
      console.log("Database Connected successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.use("/", user);

app.use(errorMiddleware);

app.listen(5000, () => {
  connectToDb();
  console.log(`[*] Server listening on Port ${5000}`);
});