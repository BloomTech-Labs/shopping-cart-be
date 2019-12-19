const request = require('supertest')
const server = require('../server')
const mongoose = require('mongoose')

describe('index route', () => {
  it('it runs', async done => {
    const res = await request(server).get('/')
    expect(res.text).toBe('Api is running!!')
    expect(res.status).toBe(200)
    done()
  })
  it('it returns URL not found message', async () => {
    const res = await request(server).get('/server/auth')
    expect(res.body).toEqual({ message: 'This URL can not be found' })
    expect(res.status).toBe(404)
  })
})

afterAll(async () => {
  try {
    await mongoose.connection.collections.sellers.drop()
    await mongoose.disconnect()
  } catch (error) {
    console.error(error.name, error.message)
  }
})
