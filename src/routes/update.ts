import * as Express from "express";
import { any, coerce, create, number, object, string } from "superstruct";

import { db } from "../db";
import { validateURL } from "../utils";

const UpdateParams = object({
  url: coerce(string(), any(), url => (validateURL(url) ? url : null)),
  view_count: number(),
});

const update = async (req: Express.Request, res: Express.Response) => {
  try {
    const url: string = req?.body?.url;
    const slug: string = req?.params?.slug;

    // validate params and reset view count
    const updateParams = create({ url, view_count: 0 }, UpdateParams);

    // update link for provided slug
    const link = await db.link.update({
      where: { slug },
      data: updateParams,
    });

    res.json(link);
  } catch (e) {
    res.status(400).send({ error: "There was a problem updating that link! Please try again." });
  }
};

export { update };
