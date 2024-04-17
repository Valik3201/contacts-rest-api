const request = require("supertest");
const app = require("../../app");

describe("POST /api/auth/login", () => {
  it("should return 200 status code, token, and user object with email and subscription fields", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "example@example.com",
      password: "examplepassword",
    });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("token");

    expect(response.body).toHaveProperty("user");

    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });
});
