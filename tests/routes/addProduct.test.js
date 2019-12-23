const request = require('supertest')
const server = require('../../server')
const Product = require('../../models/product')
const Seller = require('../../models/seller')
const Store = require('../../models/store')

let token

async function clearDb () {
  await Product.deleteMany({})
  await Seller.deleteMany({})
  await Store.deleteMany({})
}

beforeAll(async () => {
  try {
    await clearDb()
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '07031900078',
        password: 'password12345'
      })

    console.log('RESBODY>>>>', response.body)
    token = response.body.token

    await request(server)
      .post('/api/store')
      .send({
        storeName: 'Glass &  Sticks',
        ownerName: 'Jane Doe',
        currency: 'dollars',
        imageUrl: 'some image'
      })
      .set('Authorization', token)
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('add a product', () => {
  it('returns No credentials provided message', async () => {
    const res = await request(server).post('/api/store/products')
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ message: 'No credentials provided' })
  })

  console.log('TOKEN>>>>>>>>>>>>>>>>', token)

  it('successfully creates a product', async () => {
    const response = await request(server)
      .post('/api/store/products')
      .send({
        name: 'product1',
        description: 'test product',
        stock: '1',
        price: '200'
      })
      .set('Authorization', token)
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.name).toBe('product1')
    expect(response.body.description).toBe('test product')
    expect(response.body.stock).toBe(1)
    expect(response.body.price).toBe(200)
  })

  it('should return Name is required', async () => {
    const response = await request(server)
      .post('/api/store/products')
      .send({
        description: 'test product',
        stock: '1',
        price: '200'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      name: 'Name field is required'
    })
  })

  it('should return description is required', async () => {
    const response = await request(server)
      .post('/api/store/products')
      .send({
        name: 'product1',
        stock: '1',
        price: '200'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      description: 'Description field is required'
    })
  })

  it('should return stock is required', async () => {
    const response = await request(server)
      .post('/api/store/products')
      .send({
        name: 'product1',
        description: 'test product',
        price: '200'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      stock: 'Stock field is required'
    })
  })

  it('should return stock cant be less than 0', async () => {
    const response = await request(server)
      .post('/api/store/products')
      .send({
        name: 'product1',
        description: 'test product',
        stock: '-1',
        price: '200'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      stock: 'Stock cant be less than 0'
    })
  })

  it('should return price is required', async () => {
    const response = await request(server)
      .post('/api/store/products')
      .send({
        name: 'product1',
        description: 'test product',
        stock: '5'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      price: 'Price field is required'
    })
  })

  it('should return price cant be less than 0', async () => {
    const response = await request(server)
      .post('/api/store/products')
      .send({
        name: 'product1',
        description: 'test product',
        stock: '5',
        price: '-200'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      price: 'Price cant be less than 0'
    })
  })
})
