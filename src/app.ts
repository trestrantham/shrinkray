import express, { Request, Response } from "express";

import { shrink } from "./routes/shrink";
import { stats } from "./routes/stats";
import { unfurl } from "./routes/unfurl";
import { update } from "./routes/update";

const app = express()
  .use(express.json())
  .get("/", (_req: Request, res: Response) => res.send("Shrink Ray 🔊"))
  .post("/shrink", shrink)
  .get("/stats", stats)
  .get("/:slug", unfurl)
  .put("/:slug", update)
  .use((_req: Request, res: Response, _next: any) =>
    res.status(404).json({ error: "That endpoint could not be found. Please try again." }),
  );

export { app };
