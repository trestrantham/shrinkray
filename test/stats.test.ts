import request from "supertest";

import { app } from "../src/app";
import { db } from "../src/db";

describe("GET /shrink", () => {
  beforeEach(async () => {
    const links = [
      { url: "https://sona.stream", slug: "sona" },
      { url: "https://sonymusic.com", slug: "sony" },
      { url: "https://universalmusic.com", slug: "universal" },
      { url: "https://wmg.stream", slug: "wmg" },
    ];

    for (const { url, slug } of links) {
      await db.link.create({ data: { url, slug } });
    }
  });

  test("should return 200 & valid response", () => {
    return request(app)
      .get("/stats")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveLength(4);
        expect(response.body[0].url).toEqual("https://sona.stream");
      });
  });

  test("should return paginated results", () => {
    return request(app)
      .get("/stats?offset=2&limit=2")
      .expect("Content-Type", /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveLength(2);
        expect(response.body[0].url).toEqual("https://universalmusic.com");
      });
  });
});
