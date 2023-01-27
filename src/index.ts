import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { shrink } from "./routes/shrink";
import { stats } from "./routes/stats";
import { unfurl } from "./routes/unfurl";

dotenv.config();

const { PORT } = process.env;
const port: number = PORT?.length ? Number(PORT) : 3000;

express()
  .use(express.json())
  .get("/", (_req: Request, res: Response) => res.send("Shrink Ray 🔊"))
  .post("/shrink", shrink)
  .get("/stats", stats)
  .get("/:slug", unfurl)
  .use((_req: Request, res: Response, _next: any) =>
    res.status(404).json({ error: "That endpoint could not be found. Please try again." }),
  )
  .listen(port, () => console.log(`Shrink Ray started on port ${port}! 🔊`));
