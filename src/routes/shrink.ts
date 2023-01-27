import * as Express from "express";
import { any, coerce, create, object, string } from "superstruct";

import { db } from "../db";
import { generateUniqueSlug, validateURL } from "../utils";

const ShrinkParams = object({
  slug: string(),
  url: coerce(string(), any(), url => (validateURL(url) ? url : null)),
});

const shrink = async (req: Express.Request, res: Express.Response) => {
  try {
    const url: string = req?.body?.url;
    const slug: string = await generateUniqueSlug();

    // validate params
    const shrinkParams = create({ slug, url }, ShrinkParams);

    // create a new link
    const link = await db.link.create({ data: shrinkParams });

    res.json(link);
  } catch (e) {
    res.status(400).send({ error: "There was a problem shrinking that URL! Please try again." });
  }
};

export { shrink };
