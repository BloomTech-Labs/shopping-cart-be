const request = require('supertest')
const server = require('../../../server')
const Store = require('../../../models/store')
const Seller = require('../../../models/seller')

let token
let token2
async function clearDb () {
  await Store.deleteMany({})
  await Seller.deleteMany({})
}
beforeEach(() => {
  jest.setTimeout(10000)
})
beforeAll(async () => {
  jest.setTimeout(10000)
  try {
    await clearDb()
  } catch (error) {
    console.error(error.name, error.message)
  }
})

afterAll(async () => {
  try {
    await clearDb()
  } catch (error) {
    console.error(error.name, error.message)
  }
})
describe('create a new store', () => {
  it('returns No credentials provided message', async () => {
    const res = await request(server).post('/api/store')
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ message: 'No credentials provided' })
  })
})

describe('test', () => {
  beforeAll(async () => {
    try {
      clearDb()
      const response1 = await request(server)
        .post('/api/auth/register')
        .send({
          phone: '2347031900033',
          password: 'password12345'
        })

      token = response1.body.token

      const response2 = await request(server)
        .post('/api/auth/register')
        .send({
          phone: '23470319000',
          password: 'password12345'
        })

      token2 = response2.body.token

      Store.create({
        storeName: 'Ruff&Rumble',
        ownerName: 'Jack Daniels',
        currency: 'dollars',
        imageUrl: 'some image',
        seller: response1.body.user.id
      })
    } catch (error) {
      console.error(error.name, error.message)
    }
  })
  it('should create a new store and return 201 OK', async () => {
    const response = await request(server)
      .post('/api/store')
      .send({
        storeName: 'Glass &  Sticks',
        ownerName: 'Jane Doe',
        currency: 'dollars',
        imageUrl: 'some image'
      })
      .set('Authorization', token2)
    const res = response.body.saved
    expect(response.status).toBe(201)
    expect(res).toBeDefined()
    expect(res).toHaveProperty('ownerName')
    expect(res).toHaveProperty('currency')
    expect(res).toHaveProperty('imageUrl')
    expect(res).toHaveProperty('storeName')
    expect(res).toHaveProperty('seller')
  })
  it('You can not create more than one store', async () => {
    const response = await request(server)
      .post('/api/store')
      .send({
        storeName: 'Ruff&Rumble',
        ownerName: 'Jack Daniels',
        currency: 'dollars',
        imageUrl: 'some image'
      })
      .set('Authorization', token2)

    expect(response.body).toEqual({ message: 'You can not create more than one store' })
  })
  it('should return Owner Name is required', async () => {
    const response = await request(server)
      .post('/api/store')
      .send({
        currency: 'Naira',
        imageUrl: 'hhtp://picture.png',
        storeName: 'deboclothing'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      ownerName: 'Name of store owner is required'
    })
  })
  it('should return currency is required', async () => {
    const response = await request(server)
      .post('/api/store')
      .send({ ownerName: 'John Doe' })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({ currency: 'Store currency is required' })
  })
  it('should return Store Name is required', async () => {
    const response = await request(server)
      .post('/api/store')
      .send({
        ownerName: 'Tody',
        currency: 'Naira',
        imageUrl: 'hhtp://picture.png'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      storeName: 'Store name is required'
    })
  })
})
