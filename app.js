import express from "express";
import morgan from "morgan";
import { config } from 'dotenv';
import cors from "cors"

import paymentRoute from "./router/razor_pay_order.js"

const app = express()


//denv for enivoment Variable
config({ path: "./config/config.env" });
// morgen for http  request check 
app.use(morgan('combined'))


// stoping any cors error and future White listing of frontend
app.use(
  cors({
    origin: "*",
    allowedHeaders: "Content-Type,Authorization,Cookie",
    exposedHeaders: "Content-Range,X-Content-Range,Set-Cookie",
    credentials: true,
  })
);

//For Expecting Json body format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let key = process.env.RAZOR_KEY_ID
app.get("/api/getkey", (req, res) =>
{
  console.log(key),
  res.status(200).json({
    status: true,
    key
  })
}



);

app.use("/api", paymentRoute)

export default app;
