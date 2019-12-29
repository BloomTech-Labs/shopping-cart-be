const request = require("supertest");
const server = require("../../../server");
const Store = require("../../../models/store");

let token;
let store_id;

async function clearDb() {
  await Store.deleteMany({});
}
beforeAll(async () => {
  jest.setTimeout(10000);
  try {
    clearDb();
    const response = await request(server)
      .post("/api/auth/register")
      .send({
        phone: "0903190035",
        password: "password12345"
      });

    token = response.body.token;

    const response2 = await request(server)
      .post("/api/store")
      .send({
        storeName: "Stone &  Sticks",
        ownerName: "Jane Doe",
        currency: "dollars",
        imageUrl: "some image"
      })
      .set("Authorization", token);
    store_id = response2.body.saved["_id"];
  } catch (error) {
    console.error(error.name, error.message);
  }
});

describe("get a store", () => {
  it("returns no store was found", async () => {
    const res = await request(server)
      .get("/api/store/5dfd9f2b77846e05c835efae")
      .set("Authorization", token);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "No store found" });
  });

  it("Return a store", async () => {
    const res = await request(server)
      .get(`/api/store/${store_id}`)
      .set("Authorization", token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("storeName", "Stone &  Sticks");
  });
});
