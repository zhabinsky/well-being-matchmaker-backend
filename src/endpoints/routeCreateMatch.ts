import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import { isNil } from "lodash";

export const routeCreateMatch = async (req: Request, res: Response) => {
  const { query } = req;

  const { id, priceKm, partnerId } = query;

  if (
    isNil(id) ||
    isNil(priceKm) ||
    isNil(partnerId) ||
    isNaN(Number(id)) ||
    isNaN(Number(priceKm)) ||
    isNaN(Number(partnerId))
  ) {
    throw Error("wrong params");
  }

  await prisma.$transaction([
    prisma.userRunningSessionExpense.create({
      data: {
        distanceKm: Number(priceKm),
        user: {
          connect: {
            id: Number(id),
          },
        },
      },
    }),

    prisma.userMatch.create({
      data: {
        user1: {
          connect: {
            id: Number(id),
          },
        },
        user2: {
          connect: {
            id: Number(partnerId),
          },
        },
      },
    }),
  ]);

  res.send("ok");
};
