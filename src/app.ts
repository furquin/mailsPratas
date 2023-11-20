import express from "express";
import dotenv from "dotenv";
import { createChanelAndConnection, consumeQueue } from "./utils/rabbitmq/rabbitmq-service";
dotenv.config();

const app = express();

app.use(express.json());
createChanelAndConnection()
  .then((channel) => {
    consumeQueue(channel, "mail");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
