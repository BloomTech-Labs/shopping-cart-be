const request = require('supertest')
const server = require('../../../server')
const Product = require('../../../models/product')
const Seller = require('../../../models/seller')

let token
let testProduct
let wrongId

async function clearDB() {
  await Product.deleteMany({})
  await Seller.deleteMany({})
}

beforeEach(() => {
  jest.setTimeout(10000)
})

beforeAll(async () => {
  jest.setTimeout(10000)
  try {
    await clearDB()
    const newProduct = new Product({
      name: 'product1',
      description: 'test product',
      stock: '1',
      price: '200',
      storeId: '5dff0f250fe71e495b5c317f'
    })
    testProduct = await newProduct.save()

    await testProduct.save()

    const response = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '2347031900078',
        password: 'password12345'
      })
    token = response.body.token
    wrongId = response.body.user.id
  } catch (err) {
    console.error(err.name, err.message)
  }
})

describe('edit product', () => {
  it('returns No credentials provided message', async () => {
    const res = await request(server).put(
      `/api/store/products/${testProduct.id}`
    )
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ message: 'No credentials provided' })
  })

  it('should return name is required', async () => {
    const res = await request(server)
      .put(`/api/store/products/${testProduct.id}`)
      .send({
        description: 'test product',
        price: '499',
        stock: '2983'
      })
      .set('Authorization', token)
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ name: 'Name field is required' })
  })

  it('should return description is required', async () => {
    const res = await request(server)
      .put(`/api/store/products/${testProduct.id}`)
      .send({
        name: 'product name',
        price: '499',
        stock: '2983'
      })
      .set('Authorization', token)
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ description: 'Description field is required' })
  })

  it('should return price is required', async () => {
    const res = await request(server)
      .put(`/api/store/products/${testProduct.id}`)
      .send({
        name: 'product name',
        description: 'test product',
        stock: '2983'
      })
      .set('Authorization', token)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ price: 'Price field is required' })
  })

  it('should return price should be a number', async () => {
    const res = await request(server)
      .put(`/api/store/products/${testProduct.id}`)
      .send({
        name: 'product name',
        description: 'test product',
        stock: '2983',
        price: 'price'
      })
      .set('Authorization', token)
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ price: 'Price must be a number' })
  })

  it('should return stock should be a number', async () => {
    const res = await request(server)
      .put(`/api/store/products/${testProduct.id}`)
      .send({
        name: 'product name',
        description: 'test product',
        price: '499',
        stock: 'ab'
      })
      .set('Authorization', token)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ stock: 'Stock must be a number' })
  })

  it('should return stock must be a number', async () => {
    const res = await request(server)
      .put(`/api/store/products/${testProduct.id}`)
      .send({
        name: 'product name',
        description: 'test product',
        price: '499',
        stock: 'stock'
      })
      .set('Authorization', token)
    expect(res.status).toEqual(400)
    expect(res.body).toEqual({ stock: 'Stock must be a number' })
  })

  it('should return updated product', async () => {
    const res = await request(server)
      .put(`/api/store/products/${testProduct.id}`)
      .send({
        name: 'product name',
        description: 'test product',
        price: '499',
        stock: '2983'
      })
      .set('Authorization', token)
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
  })

  it('should return product not found', async () => {
    const res = await request(server)
      .put(`/api/store/products/${wrongId}`)
      .send({
        name: 'product name',
        description: 'test product',
        price: '499',
        stock: '2983'
      })
      .set('Authorization', token)
    expect(res.status).toBe(404)
    expect(res.body).toBeDefined()
    expect(res.body).toEqual({ message: 'No product was found' })
  })
})
