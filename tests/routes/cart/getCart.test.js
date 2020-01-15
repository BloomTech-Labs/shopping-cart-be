const request = require('supertest')
const server = require('../../../server')
const Product = require('../../../models/product')
const Seller = require('../../../models/seller')
const Store = require('../../../models/store')
const Cart = require('../../../models/cart')

let token

async function clearDb() {
  await Seller.deleteMany({})
  await Product.deleteMany({})
  await Store.deleteMany({})
  await Cart.deleteMany({})
}

beforeAll(async () => {
  try {
    await clearDb()
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '+233276202069',
        password: 'password12345'
      })

    token = response.body.token

    await request(server)
      .post('/api/store')
      .send({
        storeName: 'Laptops & Phones',
        ownerName: 'Jane Doe',
        currency: 'dollars',
        imageUrl: 'some image'
      })
      .set('Authorization', token)
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('get cart contents', () => {
  it('should return store not found', async () => {
    const response = await request(server).get(
      '/api/store/5e1ee0099f037d24abba6aa9/cart'
    )
    console.log(response.body)
    expect(response.status).toBe(404)
  })
})
