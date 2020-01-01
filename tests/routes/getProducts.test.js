const request = require("supertest");
const server = require("../../server");
const Product = require("../../models/product");
const Store = require("../../models/store");

let token;
let storeId;

async function clearDb() {
  await Store.deleteMany({});
  await Product.deleteMany({});
}

beforeAll(async () => {
  try {
    await clearDb();
    const response = await request(server)
      .post("/api/auth/register")
      .send({
        phone: "07031900078",
        password: "password12345"
      });
    token = response.body.token;

    const res = await request(server)
      .post("/api/store")
      .send({
        storeName: "Glass &  Sticks",
        ownerName: "Jane Doe",
        currency: "dollars",
        imageUrl: "some image"
      })
      .set("Authorization", token);
    storeId = res.body.saved["_id"];
  } catch (error) {
    console.error(error.name, error.message);
  }
});

describe("get all products", () => {
  test("should return no products found", async () => {
    const response = await request(server).get(
      "/api/store/products/5e00a47af069c4278845cfb1"
    );
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "No products found" });
  });

  test("should return one product", async () => {
    await request(server)
      .post("/api/store/products")
      .send({
        name: "product1",
        description: "some description here",
        stock: "1",
        price: "200"
      })
      .set("Authorization", token);

    const response = await request(server).get(
      `/api/store/products/${storeId}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty(
      "description",
      "some description here"
    );
    expect(response.body[0]).toBeTruthy();
  });
});
