require('dotenv').config()

const { NODE_ENV } = process.env
<<<<<<< HEAD
let mongoURI = ''

if (NODE_ENV === 'test') {
  mongoURI = process.env.DB_CONNECTION_TEST
} else {
  mongoURI = process.env.DB_CONNECTION
}

module.exports = mongoURI
=======
let mongoURL = ''

if (NODE_ENV === 'test') {
  // add: "mongodb://localhost/test" for travis config
  mongoURL = process.env.DB_CONNECTION_TEST || 'mongodb://localhost/test'
} else {
  mongoURL = process.env.DB_CONNECTION
}

module.exports = mongoURL
>>>>>>> 1627b2a29131be4c4cd93f62ae3176298d965081
