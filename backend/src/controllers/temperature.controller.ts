import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRecentTemperatures = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const oneMinuteAgoTime = new Date(Date.now() - 60 * 1000);

    const temperatures = await prisma.temperature.findMany({
      where: {
        timestamp: {
          gte: oneMinuteAgoTime,
        },
      },
      orderBy: {
        timestamp: "asc",
      },
    });

    if (temperatures.length === 0) {
      const error = new Error("No temperatures recorded in the past minute");
      return next(error);
    }

    res.status(200).json({
      message: "Temperature data fetched successfully",
      data: temperatures,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching temperatures:", error);
    next(error);
  }
};
