require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json('Api is running!!')
})

module.exports = server;
