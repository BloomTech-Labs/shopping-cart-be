require("dotenv").config();

const { NODE_ENV } = process.env;
let mongoURL = "";

if (NODE_ENV === "testing") {
  // add: "mongodb://localhost/test" for travis config
  mongoURL = process.env.DB_CONNECTION_TEST || "mongodb://localhost/test";
} else {
  mongoURL = process.env.DB_CONNECTION;
}

module.exports = mongoURL;
