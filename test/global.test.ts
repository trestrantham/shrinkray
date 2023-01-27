import { db } from "../src/db";

afterAll(async () => {
  await db.link.deleteMany({});
});

test("redirects with a minimum of 20rps", () => {
  true;
});
