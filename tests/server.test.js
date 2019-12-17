const request = require("supertest");
const server = require("../server");



beforeEach(() => {
  jest.setTimeout(10000);
});

describe("index route", () => {
  it("it runs", async done => {
    const res = await request(server).get("/");
    expect(res.text).toBe("Api is running!!");
    expect(res.status).toBe(200);
    done();
  });
});
