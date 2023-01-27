import * as Express from "express";

import { db } from "../db";

const stats = async (_req: Express.Request, res: Express.Response) => {
  try {
    const links = await db.link.findMany();

    res.json(links);
  } catch (e) {
    res.status(400).send({ error: "There was a problem fetching links! Please try again." });
  }
};

export { stats };
