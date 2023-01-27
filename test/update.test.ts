import request from "supertest";

import { app } from "../src/app";
import { db } from "../src/db";

describe("UPDATE /update", () => {
  beforeEach(async () => {
    await db.link.create({ data: { url: "https://sona.stream", slug: "sona" } });
  });

  afterEach(async () => {
    await db.link.deleteMany({});
  });

  test("should return 201 & valid response if link is created successfully", () => {
    return request(app)
      .put("/sona")
      .send({ url: "https://soda.stream" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body.url).toEqual("https://soda.stream");
        expect(response.body.slug).toEqual("sona");
      });
  });

  // test("should return 400 if invalid params are passed", () => {
  //   return request(app)
  //     .post("/shrink")
  //     .send({ not_a_url: "https://sona.stream" })
  //     .expect("Content-Type", /json/)
  //     .expect(400)
  //     .then(response => {
  //       expect(response.body.error.length).toBeGreaterThan(0);
  //     });
  // });
});
