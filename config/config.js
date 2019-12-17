require('dotenv').config()

const { NODE_ENV } = process.env
let mongoURI = ''

if (NODE_ENV === 'test') {
  mongoURI = process.env.DB_CONNECTION_TEST
} else {
  mongoURI = process.env.DB_CONNECTION
}

module.exports = mongoURI
