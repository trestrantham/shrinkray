import request from "supertest";

import { app } from "../src/app";
import { db } from "../src/db";

// this is a global DB clean!
beforeAll(async () => {
  await db.link.deleteMany({});
});
afterAll(async () => {
  await db.link.deleteMany({});
});

describe("POST /shrink", () => {
  afterEach(async () => {
    await db.link.deleteMany({});
  });

  test("should return 201 & valid response if link is created successfully", () => {
    return request(app)
      .post("/shrink")
      .send({ url: "https://sona.stream" })
      .expect("Content-Type", /json/)
      .expect(201)
      .then(response => {
        expect(response.body.url).toEqual("https://sona.stream");
        expect(response.body.slug.length).toBeGreaterThan(0);
      });
  });

  test("should return 400 if invalid params are passed", () => {
    return request(app)
      .post("/shrink")
      .send({ not_a_url: "https://sona.stream" })
      .expect("Content-Type", /json/)
      .expect(400)
      .then(response => {
        expect(response.body.error.length).toBeGreaterThan(0);
      });
  });
});
