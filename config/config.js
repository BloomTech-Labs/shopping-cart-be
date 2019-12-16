require('dotenv').config();

const { NODE_ENV } = process.env;
let mongoURL = '';

if (NODE_ENV === 'test') {
  mongoURL = process.env.DB_CONNECTION_TEST;
} else {
  mongoURL = process.env.DB_CONNECTION;
}

module.exports = mongoURL;