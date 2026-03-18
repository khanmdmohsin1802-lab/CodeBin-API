import app from "../index.js";
import { describe, it, expect } from "@jest/globals";
import request from "supertest";

describe("Testing API integration", () => {
  it("should return 404 error", async () => {
    const response = await request(app).get("/batman");

    expect(response.status).toBe(404);
  });
});
