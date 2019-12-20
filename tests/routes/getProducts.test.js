const request = require('supertest')
const server = require('../../server')
const Product = require('../../models/product')
const mongoose = require('mongoose')

async function clearDb() {
  await Product.deleteMany({})
}

beforeAll(async () => {
  try {
    await clearDb()
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('get all products', () => {
  test('should return no products found', async () => {
    const response = await request(server).get('/api/store/products')
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'No products found' })
  })

  test('should return one product', async () => {
    const product = await Product.create({
      name: "Apetsi's product",
      description: 'some description here',
      price: 300,
      stock: 4958,
      storeId: '5dfa58c0b825192402a38b29'
    })
    const response = await request(server).get('/api/store/products')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(1)
    expect(response.body[0]).toHaveProperty(
      'description',
      'some description here'
    )
    expect(response.body[0]).toBeTruthy()
  })
})
