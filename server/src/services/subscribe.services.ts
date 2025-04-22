import prisma from "../prisma";
import { Subscribe } from "../types";
import { subscribtionCretion } from "./email.service";

export const subscribe = async (subscribeData: Subscribe) => {
  const { firstname, lastname, email, subject, message } = subscribeData;

  const subscribe = await prisma.subscribe.create({
    data: {
      firstname,
      lastname,
      email,
      subject,
      message,
    },
  });

  await subscribtionCretion(email, firstname);
  return { subscribe };
};
