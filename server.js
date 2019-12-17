require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoURL = require('./config/config')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

mongoose.connect(mongoURL, { useNewUrlParser: true })

server.get('/', (req, res) => {
  res.status(200).send('Api is running!!')
})

module.exports = server
