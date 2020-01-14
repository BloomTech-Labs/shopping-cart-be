require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const mongoURI = require('./config/config')

const authRouter = require('./routes/authRouter')
const productRouter = require('./routes/productRouter')
const storeRouter = require('./routes/storeRouter')
const cartRouter = require('./routes/cartRouter')
const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use('/api/auth', authRouter)
server.use('/api/store', productRouter)
server.use('/api/store', storeRouter)
server.use('/api/store', cartRouter)

server.use(express.static(path.join(__dirname, 'public')))
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'pug')

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
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
