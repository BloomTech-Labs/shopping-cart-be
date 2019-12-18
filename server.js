require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')
const mongoURI = require('./config/config')

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

server.all('*', (req, res) => {
  res.status(404).json({ message: 'This URL can not be found' })
})

module.exports = server
