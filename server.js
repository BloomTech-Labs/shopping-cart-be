require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
<<<<<<< HEAD
const mongoURI = require('./config/config')
console.log(mongoURI)
=======
const mongoURL = require('./config/config')
>>>>>>> 1627b2a29131be4c4cd93f62ae3176298d965081

const sellersRouter = require('./routes/registerSeller')
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', sellersRouter)
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB is connected')
  })

  .catch(err => console.log(err))

server.get('/', (req, res) => {
  res.status(200).send('Api is running!!')
})

module.exports = server
