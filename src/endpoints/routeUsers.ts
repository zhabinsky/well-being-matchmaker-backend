import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma";
import distance from "@turf/distance";
import { memoize, sortBy } from "lodash";
import { differenceInCalendarYears } from "date-fns";
import { Gender } from "@prisma/client";

export const routeUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;

  const userMe = await prisma.user.findFirstOrThrow({
    where: {
      id: Number(query.id),
    },

    include: {
      userRunningSessions: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          distanceKm: true,
          createdAt: true,
        },
      },
      userRunningSessionExpenses: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          distanceKm: true,
          createdAt: true,
        },
      },
    },
  });

  const users = await prisma.user.findMany({
    where: {
      id: {
        not: userMe.id,
      },

      gender: {
        in: userMe.genderInterests,
      },
    },

    include: {
      userMatches1: {
        where: {
          OR: [{ userId1: userMe.id }, { userId2: userMe.id }],
        },
      },
      userMatches2: {
        where: {
          OR: [{ userId1: userMe.id }, { userId2: userMe.id }],
        },
      },

      userRunningSessions: {
        orderBy: {
          createdAt: "desc",
        },

        select: {
          distanceKm: true,
          createdAt: true,
        },
      },
    },
  });

  const sortedUsers = sortBy(
    users.map(
      ({
        latitude,
        longitude,
        birthday,
        genderInterests,
        createdAt,
        userRunningSessions,
        ...user
      }) => {
        const distanceFromYou = distance(
          {
            type: "Point",
            coordinates: [latitude, longitude],
          },
          {
            type: "Point",
            coordinates: [userMe.latitude, userMe.longitude],
          }
        );

        const userPurchasePower = userRunningSessions.reduce((acc, current) => {
          return acc + current.distanceKm;
        }, 0);

        return {
          ...user,

          ageYears: differenceInCalendarYears(new Date(), birthday),

          userPurchasePower,
          userRunningSessions,

          distanceFromYou,
          distanceFromYouPretty:
            Math.max(
              distanceFromYou < 2
                ? Number(distanceFromYou.toFixed(1))
                : Math.floor(distanceFromYou),
              0.5
            ) + "km",
        };
      }
    ),

    "distanceFromYou"
  );

  const getAvgPurchasePowerByGenderInterest = memoize(
    async (gender: Gender) => {
      const suitors = await prisma.user.findMany({
        where: {
          genderInterests: {
            has: gender,
          },
        },
        select: {
          userRunningSessions: {
            select: {
              distanceKm: true,
            },
          },
        },
      });

      return (
        suitors.reduce((acc, { userRunningSessions }) => {
          return (
            acc +
            userRunningSessions.reduce((acc, current) => {
              return acc + current.distanceKm;
            }, 0)
          );
        }, 0) / suitors.length
      );
    }
  );

  const getPeersPurchaseAvgPower = memoize(async (gender: Gender) => {
    const suitors = await prisma.user.findMany({
      where: {
        gender,
      },
      select: {
        userRunningSessions: {
          select: {
            distanceKm: true,
          },
        },
      },
    });

    return (
      suitors.reduce((acc, { userRunningSessions }) => {
        return (
          acc +
          userRunningSessions.reduce((acc, current) => {
            return acc + current.distanceKm;
          }, 0)
        );
      }, 0) / suitors.length
    );
  });

  const balance = {
    in: Number(
      userMe.userRunningSessions
        .reduce((acc, current) => {
          return acc + current.distanceKm;
        }, 0)
        .toFixed(1)
    ),

    out: Number(
      userMe.userRunningSessionExpenses
        .reduce((acc, current) => {
          return acc + current.distanceKm;
        }, 0)
        .toFixed(1)
    ),
  };

  const myBalanceKm = Math.floor(balance.in - balance.out);

  const tagsMap = {
    zodiac_scorpion: "Scorpio",
    children_yes: "Want's children",
    children_no: "Doesn't want children",
    pets_yes: "Pets",
    pets_no: "No Pets",
    cats: "Likes Cats",
    dogs: "Likes Dogs",
  };

  res.json(
    await Promise.all(
      sortedUsers.map(
        async ({
          userPurchasePower,
          userMatches1,
          userMatches2,
          tags,
          ...user
        }) => {
          const [genderPurchasePower, genderPurchasePowerOpposite] =
            await Promise.all([
              getPeersPurchaseAvgPower(user.gender),
              getAvgPurchasePowerByGenderInterest(user.gender),
            ]);

          const priceKm = Math.round(
            Number(
              (
                genderPurchasePowerOpposite *
                (userPurchasePower / genderPurchasePower)
              ).toFixed(1)
            )
          );

          const hasMatchedWithMe =
            userMatches1.length > 0 || userMatches2.length > 0;

          return {
            genderPurchasePowerOpposite,
            userPurchasePower,
            genderPurchasePower,

            hasMatchedWithMe,

            tags,

            tagsPretty: tags.map((e) => tagsMap[e]),

            balance,

            priceKm,
            myBalanceKm,

            ...user,
          };
        }
      )
    )
  );
};
