const request = require('supertest')
const server = require('../../../server')
const Seller = require('../../../models/seller')

let token
let tokenReg
let tokenReg2
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

describe('Password Reset Route', () => {
  it('validate phone input', async () => {
    const res = await request(server).post('/api/auth/recover')
    const { phone } = res.body
    expect(res.status).toBe(400)
    expect(phone).toBeDefined()
  })

  it('checks if phone number is associated to an account', async () => {
    const res = await request(server)
      .post('/api/auth/recover')
      .send({ phone: '123456765' })
    const message = res.body.message
    expect(res.status).toBe(401)
    expect(message).toBeDefined()
  })

  it('validate password input field', async () => {
    const res = await request(server).post(
      '/api/auth/reset/5678394yghf89r04iuhr4'
    )
    const { password } = res.body
    expect(res.status).toBe(400)
    expect(password).toBeDefined()
  })

  it('resetPassword route: check if seller has valid resetPasswordToken that has not expired', async () => {
    const responseReg2 = await request(server)
      .post('/api/auth/register')
      .send({ phone: '2347031990222', password: 'password12345' })
    tokenReg2 = responseReg2.body.token
    const response3 = await request(server)
      .post(`/api/auth/reset/${tokenReg}`)
      .send({
        password: 'passsword123',
        confirmPassword: 'password123'
      })
    const message = response3.body
    expect(response3.status).toBe(401)
    expect(message).toEqual({
      message: 'Password reset token is invalid or has expired.'
    })
  })
})

describe('Password Reset Route II', () => {
  beforeAll(async () => {
    try {
      clearDb()
      const response1 = await request(server)
        .post('/api/auth/register')
        .send({
          phone: '2348124120374',
          password: 'password12345'
        })

      token = response1.body.token
    } catch (error) {
      console.error(error.name, error.message)
    }
  })
  // test is skipped except absolutely necessary to test this case because we are making calls to twilio endpoint here
  it.skip('send a reset message(link) if phone number is valid', async () => {
    const res = await request(server)
      .post('/api/auth/recover')
      .send({
        phone: '2348124120374'
      })
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
  })
})
