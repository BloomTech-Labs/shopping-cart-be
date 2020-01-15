const request = require('supertest')
const server = require('../../../server')
const Seller = require('../../../models/seller')

let token

async function clearDb () {
  await Seller.deleteMany({})
}
beforeEach(() => {
  jest.setTimeout(10000)
})

beforeAll(async () => {
  jest.setTimeout(10000)

  try {
    await clearDb()
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '2347031900078',
        password: 'password12345'
      })

    token = response.body.token
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('delete an account', () => {
  it('returns No credentials provided', async () => {
    const res = await request(server).delete('/api/auth/account')
    expect(res.body).toEqual({ message: 'No credentials provided' })
    expect(res.status).toBe(400)
  })
  it('returns user has been removed', async () => {
    const res = await request(server)
      .delete('/api/auth/account')
      .set('Authorization', token)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'user account has been removed' })
  })

  it('There is no user associated with this account', async () => {
    const res = await request(server)
      .delete('/api/auth/account')
      .set('Authorization', token)

    expect(res.status).toBe(404)
    expect(res.body).toEqual({
      message: 'There is no user associated with this account'
    })
  })
})
