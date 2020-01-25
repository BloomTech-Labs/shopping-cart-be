const request = require('supertest')
const server = require('../../../server')
const Product = require('../../../models/product')
const Seller = require('../../../models/seller')
const Store = require('../../../models/store')
const Cart = require('../../../models/cart')

let token
let storeId
let cartId
let product1Id
let product2Id

async function clearDb() {
  await Seller.deleteMany({})
  await Product.deleteMany({})
  await Store.deleteMany({})
  await Cart.deleteMany({})
}

// beforeEach(() => {
//   jest.setTimeout(10000)
// })

beforeAll(async () => {
  jest.setTimeout(10000)
  try {
    await clearDb()
    const response = await request(server)
      .post('/api/auth/register')
      .send({ phone: '+233276202069', password: '12345678' })

    token = response.body.token

    const store = await request(server)
      .post('/api/store')
      .send({
        storeName: 'Laptops & Phones',
        ownerName: 'Jane Doe',
        currency: 'dollars',
        imageUrl: 'some image',
        address: 'no 337 rous road'
      })
      .set('Authorization', token)

    storeId = store.body.saved._id

    //   create products
    const product1 = await request(server)
      .post('/api/store/products')
      .send({
        name: 'Shoes1',
        description: 'A very nice',
        price: 500,
        stock: 10,
        images: ['mee.jpg', 'us.jpg']
      })
      .set('Authorization', token)
    product1Id = product1.body._id

    const product2 = await request(server)
      .post('/api/store/products')
      .send({
        name: 'Shoes2',
        description: 'A very nice2',
        price: 5000,
        stock: 100,
        images: ['mee2.jpg', 'us2.jpg']
      })
      .set('Authorization', token)

    product2Id = product2.body._id

    // create a cart
    const cart = await request(server)
      .post(`/api/store/${storeId}/cart`)
      .send({ total: 340, agreedPrice: 340, email: 'johndoe@gmail.com' })
    console.log(cart.body)
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('approve cart route', () => {
  it('should return total and agreed price is required', async () => {
    const response = await request(server)
      .put(`/api/store/cart/${cartId}/approve`)
      .send({})
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body.total).toBeDefined()
    expect(response.body.agreedPrice).toBeDefined()
  })

  it('should return cart not found', async () => {
    const response = await request(server)
      .put(`/api/store/cart/${storeId}/approve`)
      .send({ total: 34, agreedPrice: 34 })
      .set('Authorization', token)
    expect(response.status).toBe(404)
    expect(response.body.message).toBeDefined()
  })

  it('should return a database related error', async () => {
    const response = await request(server)
      .put(`/api/store/cart/wrongid/approve`)
      .send({ total: 34, agreedPrice: 34 })
      .set('Authorization', token)
    expect(response.status).toBe(500)
    expect(response.body).toBeDefined()
  })

  it('should return final lock on cart', async () => {
    const response = await request(server)
      .put(`/api/store/cart/${cartId}/approve`)
      .send({ total: 34, agreedPrice: 34 })
      .set('Authorization', token)
    console.log()
  })
})
