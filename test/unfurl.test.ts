import request from "supertest";

import { app } from "../src/app";
import { db } from "../src/db";

describe("GET /:slug", () => {
  beforeEach(async () => {
    await db.link.create({ data: { url: "https://sona.stream", slug: "sona" } });
  });

  afterEach(async () => {
    await db.link.deleteMany({});
  });

  test("should return 302 & valid redirct", () => {
    return request(app)
      .get("/sona")
      .expect(302)
      .then(response => {
        expect(response.headers.location).toEqual("https://sona.stream");
      });
  });

  test("should return 404 for an invalid slug", () => {
    return request(app)
      .get("/not-sona")
      .expect(404)
      .then(response => {
        expect(response.body.error).toEqual("Could not find a link for that slug! Please try again.");
      });
  });
});
