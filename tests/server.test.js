const request = require('supertest')
const server = require('../server')

describe('index route', () => {
  it('it runs', async () => {
    const res = await request(server).get('/')
    expect(res.text).toBe('Api is running!!')
    expect(res.status).toBe(200)
  })
})
