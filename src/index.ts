import dotenv from "dotenv";
import Express, { Request, Response } from "express";

import { shrink } from "./routes/shrink";
import { stats } from "./routes/stats";

dotenv.config();

const { PORT } = process.env;
const port: number = PORT?.length ? Number(PORT) : 3000;

Express()
  .use(Express.json())
  .get("/", (_req: Request, res: Response) => res.send("OK"))
  .post("/shrink", shrink)
  .get("/stats", stats)
  .use((_req: Request, res: Response, _next: any) => res.status(404).json({ error: "not found" }))
  .listen(port, () => console.log(`Shrink Ray started on port ${port}! 🚀`));
