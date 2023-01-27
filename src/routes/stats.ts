import * as Express from "express";

import { db } from "../db";

const PAGE_SIZE = 100;

const stats = async (req: Express.Request, res: Express.Response) => {
  const limit: number = Number(req?.query?.limit) || PAGE_SIZE;
  const offset: number = Number(req?.query?.offset) || 0; // can be NaN so default to 0 if so

  try {
    const links = await db.link.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: "asc",
      },
    });

    res.json(links);
  } catch (e) {
    res.status(400).send({ error: "There was a problem fetching links! Please try again." });
  }
};

export { stats };
