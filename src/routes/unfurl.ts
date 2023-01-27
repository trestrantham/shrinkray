import * as Express from "express";

import { db } from "../db";

const unfurl = async (req: Express.Request, res: Express.Response) => {
  const slug: string = req?.params?.slug;

  try {
    const link = await db.link.findUnique({
      where: { slug },
    });

    if (link?.url.length) {
      // commit link updates to the DB
      await db.link.update({ where: { slug: slug }, data: { view_count: link.view_count + 1 } });

      res.redirect(link.url);
    } else {
      res.status(400).send({ error: "Could not find a link for that slug! Please try again." });
    }
  } catch (e) {
    res.status(400).send({ error: "There was a problem fetching this link! Please try again." });
  }
};

export { unfurl };
