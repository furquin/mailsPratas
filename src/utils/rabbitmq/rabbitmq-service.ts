import { Channel, connect } from "amqplib";
import * as usecases from "../../usecases/mail";
import dotenv from "dotenv";
dotenv.config();

export const createChanelAndConnection = async () => {
  const channel: Channel = await (
    await connect(
      process.env.RMQ_URI || "amqp://admin:admin@host.docker.internal:5672"
    )
  ).createChannel();
  return channel;
};

export const consumeQueue = async (channel: Channel, queue: string) => {
  await channel.assertQueue(queue);
  await channel.consume(queue, (message) => {
    if (!message) return;
    const params = JSON.parse(message?.content.toString());
    switch (params.template) {
      case "new-register":
        usecases.NewRegisterMailUseCase.newRegisterMailUseCase({
          to: params.email,
          template: params.template,
        });
        channel.ack(message);
        break;
    }
  });
};
