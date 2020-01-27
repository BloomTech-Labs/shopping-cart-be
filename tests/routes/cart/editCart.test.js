const request = require('supertest')
const server = require('../../../server')
const Product = require('../../../models/product')
const Seller = require('../../../models/seller')
const Store = require('../../../models/store')
const Cart = require('../../../models/cart')

let token
let cartId
let storeId
let product1Id
let product2Id

async function clearDb() {
  await Seller.deleteMany({})
  await Product.deleteMany({})
  await Store.deleteMany({})
  await Cart.deleteMany({})
}

beforeEach(() => {
  jest.setTimeout(30000)
})

beforeAll(async () => {
  jest.setTimeout(30000)
  try {
    await clearDb()
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '+233276202069',
        password: 'password12345'
      })

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

    // add item to cart
    const cart = await request(server)
      .post(`/api/store/${storeId}/cart`)
      .send({
        agreedPrice: 40,
        total: 400,
        email: 'test@gmail.com',
        contents: [
          { product: product1Id, quantity: 3 },
          { product: product2Id, quantity: 3 }
        ]
      })

    cartId = cart.body.result._id
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('edit cart route', () => {
  it('should work', () => {
    expect(1).toBe(1)
  })

  it('should return some total and agreed price required', async () => {
    const response = await request(server)
      .put(`/api/store/cart/${cartId}`)
      .send({})
    expect(response.status).toBe(400)
    expect(response.body.total).toBeDefined()
    expect(response.body.agreedPrice).toBeDefined()
  })

  it('should return cart not found', async () => {
    const response = await request(server)
      .put(`/api/store/cart/${product2Id}`)
      .send({ total: 34, agreedPrice: 34 })
    expect(response.status).toBe(404)
    expect(response.body.message).toBeDefined()
  })

  xit(`should return the updated cart`, async () => {
    const response = await request(server)
      .put(`/api/store/cart/${cartId}`)
      .send({ total: 34, agreedPrice: 34, email: 'test2@gmail.com' })
    expect(response.status).toBe(200)
    expect(response.body.email).toEqual(
      expect.not.stringContaining('test@gmail.com')
    )
  })

  it('should return a server side error', async () => {
    const response = await request(server)
      .put(`/api/store/cart/wrongid`)
      .send({ total: 34, agreedPrice: 34, email: 'test2@gmail.com' })
    expect(response.status).toBe(500)
  })
})
