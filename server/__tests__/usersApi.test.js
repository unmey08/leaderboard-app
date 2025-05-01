const request = require("supertest");
const app = require("../app");

let createdUserId = "";
describe("User API Endpoints", () => {
  test("GET /users - should return a list of users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /users - should add a new user", async () => {
    const newUser = { name: "Charlie", age: 35, address: "789 Birch St" };
    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("Charlie");
    createdUserId = response.body.data._id;
  });

  test("PATCH /users/:id/points - should update user points", async () => {
    const response = await request(app)
      .patch(`/users/${createdUserId}/points`)
      .send({ delta: 10 });

    expect(response.status).toBe(200);
    expect(response.body.points).toBe(10);
  });

  test("DELETE /users/:id - should delete a user", async () => {
    const response = await request(app).delete(`/users/${createdUserId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
