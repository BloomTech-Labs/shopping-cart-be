const request = require('supertest')
const server = require('../server')

describe('index route', () => {
<<<<<<< HEAD
  it('it runs', async () => {
    const res = await request(server).get('/')
    expect(res.text).toBe('Api is running!!')
    expect(res.status).toBe(200)
=======
  test('it runs', async done => {
    const res = await request(server).get('/')
    expect(res.text).toBe('Api is running!!')
    expect(res.status).toBe(200)
    done()
>>>>>>> 1627b2a29131be4c4cd93f62ae3176298d965081
  })
})
