import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import { isNil } from "lodash";

export const routeCreateRunningSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;

  const { id, km } = query;

  if (isNil(id) || isNil(km) || isNaN(Number(id)) || isNaN(Number(km))) {
    throw Error("wrong params");
  }

  const userRunningSession = await prisma.userRunningSession.create({
    data: {
      user: {
        connect: {
          id: Number(id),
        },
      },

      distanceKm: Number(km),
    },
  });

  console.log(JSON.stringify(userRunningSession, null, 2));

  res.send("ok");
};
