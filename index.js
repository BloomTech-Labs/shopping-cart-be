const server = require('./server')
const port = process.env.PORT

server.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
