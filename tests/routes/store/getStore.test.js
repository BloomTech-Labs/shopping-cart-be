const request = require('supertest')
const server = require('../../../server')
const Store = require('../../../models/store')

let token
let token2

async function clearDb () {
  await Store.deleteMany({})
}
beforeEach(() => {
  jest.setTimeout(10000)
})
beforeAll(async () => {
  jest.setTimeout(10000)
  try {
    clearDb()
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '2347031900053',
        password: 'password12345'
      })

    token = response.body.token

    const response2 = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '2347031900153',
        password: 'password12345'
      })

    token2 = response2.body.token

    await request(server)
      .post('/api/store')
      .send({
        storeName: 'wear4feet',
        ownerName: 'Jane Doe',
        currency: 'dollars',
        imageUrl: 'some image'
      })
      .set('Authorization', token)
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('get a store', () => {
  it('Return a store', async () => {
    const res = await request(server)
      .get('/api/store')
      .set('Authorization', token)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('storeName', 'wear4feet')
  })
  it('Return No store found', async () => {
    const res = await request(server)
      .get('/api/store')
      .set('Authorization', token2)
    expect(res.status).toBe(404)
  })
})
