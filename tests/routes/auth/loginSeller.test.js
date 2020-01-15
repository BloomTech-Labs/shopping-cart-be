const request = require('supertest')
const server = require('../../../server')
const Seller = require('../../../models/seller')

async function clearDb () {
  await Seller.deleteMany({})
}
beforeEach(() => {
  jest.setTimeout(10000)
})

beforeAll(async () => {
  try {
    await clearDb()
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('loginSeller', () => {
  it('expects 400 response if no user login data', async () => {
    const res = await request(server).post('/api/auth/login')
    expect(res.status).toBe(400)
  })
  it('expects Password field is required error message', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        phone: '2347032716121'
      })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ password: 'Password field is required' })
  })
  it('expects Password length is not less than 6', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        phone: '2347032716122',
        password: 'Pass'
      })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({
      password: 'Password must be at least 6 characters'
    })
  })
  it('expects Phone Number is invalid error message ', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        phone: 'tolu',
        password: 'Password12345'
      })
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ phone: 'Phone Number is invalid' })
  })
  it('checks if user has been logged in successfully with a token being returned', async () => {
    await request(server)
      .post('/api/auth/register')
      .send({
        phone: '2347031900035',
        password: 'Password12345'
      })
    const res = await request(server)
      .post('/api/auth/login')
      .send({
        phone: '2347031900035',
        password: 'Password12345'
      })

    const { token } = res.body
    expect(res.status).toBe(200)
    expect(token).toBeDefined()
  })
})
