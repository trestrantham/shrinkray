import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();

const { PORT } = process.env;
const port: number = PORT?.length ? Number(PORT) : 3000;

app.listen(port, () => console.log(`Shrink Ray started on port ${port}! 🔊`));
