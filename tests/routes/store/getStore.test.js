const request = require('supertest')
const server = require('../../../server')
const Store = require('../../../models/store')

let token

async function clearDb () {
  await Store.deleteMany({})
}
beforeAll(async () => {
  jest.setTimeout(10000)
  try {
    clearDb()
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '0903190035',
        password: 'password12345'
      })

    token = response.body.token

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
})
