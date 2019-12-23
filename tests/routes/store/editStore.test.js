const request = require('supertest')
const server = require('../../../server')
const Store = require('../../../models/store')

let token
let wrongToken
let store_id
let seller

async function clearDb () {
  await Store.deleteMany({})
}

beforeAll(async () => {
  jest.setTimeout(10000)
  try {
    clearDb()
    const response1 = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '07031900036',
        password: 'password12345'
      })
    const response2 = await request(server)
      .post('/api/auth/register')
      .send({ phone: '07031900037', password: 'password12345' })

    wrongToken = response2.body.token
    token = response1.body.token
    seller = response1.body.user.id

    //   Create a store
    const newStore = new Store({
      storeName: 'Book &  Sticks',
      ownerName: 'Jane Doe',
      currency: 'dollars',
      imageUrl: 'some image',
      seller: response1.body.user.id
    })

    store_id = newStore.id

    newStore
      .save()
      .then(store => {})
      .catch(err => console.log(err))
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('edit store', () => {
  it('should work', async () => {
    expect(1).toBe(1)
  })

  it('should return no credentials provided', async () => {
    const response = await request(server).put(`/api/store/${store_id}`)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ message: 'No credentials provided' })
  })

  it('should return all fields required', async () => {
    const response = await request(server)
      .put(`/api/store/${store_id}`)
      .send({})
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      ownerName: 'Name of store owner is required',
      currency: 'Store currency is required',
      storeName: 'Store name is required'
    })
  })

  it('should return currency, imageUrl & storename required', async () => {
    const response = await request(server)
      .put(`/api/store/${store_id}`)
      .send({ ownerName: 'John Doe' })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      currency: 'Store currency is required',
      storeName: 'Store name is required'
    })
  })

  it('should return imageUrl & storename required', async () => {
    const response = await request(server)
      .put(`/api/store/${store_id}`)
      .send({ ownerName: 'John Doe', currency: 'cedi' })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      // imageUrl: 'Store imageURL is required',
      storeName: 'Store name is required'
    })
  })

  it('should return storename required', async () => {
    const response = await request(server)
      .put(`/api/store/${store_id}`)
      .send({
        ownerName: 'John Doe',
        currency: 'cedi',
        imageUrl: 'https://someimage.com'
      })
      .set('Authorization', token)
    expect(response.status).toBe(400)
    expect(response.body).toBeDefined()
    expect(response.body).toEqual({
      storeName: 'Store name is required'
    })
  })

  it('should return edited store info', async () => {
    const testStore = await Store.create({
      storeName: 'Book &  Lockers',
      ownerName: 'Susan Doe',
      currency: 'dollars',
      imageUrl: 'some image',
      seller
    })
    const response = await request(server)
      .put(`/api/store/${testStore.id}`)
      .send({
        ownerName: 'John Doe',
        currency: 'shillings',
        imageUrl: 'https://someimage.com',
        storeName: 'sticks & bones'
      })
      .set('Authorization', token)
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
  })

  it('should return user access error', async () => {
    const testStore = await Store.create({
      storeName: 'Book &  Drums',
      ownerName: 'Susan Doe',
      currency: 'dollars',
      imageUrl: 'some image',
      seller
    })
    const response = await request(server)
      .put(`/api/store/${testStore.id}`)
      .send({
        ownerName: 'John Doe',
        currency: 'cedi',
        imageUrl: 'https://someimage.com',
        storeName: 'sticks & bones'
      })
      .set('Authorization', wrongToken)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      message: 'You can only modify your own store'
    })
  })

  it('should return store not found', async () => {
    const response = await request(server)
      .put('/api/store/5dfca0dcec912243c05735a9')
      .send({
        ownerName: 'John Doe',
        currency: 'cedi',
        imageUrl: 'https://someimage.com',
        storeName: 'sticks & bones'
      })
      .set('Authorization', token)
    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'No store was found' })
  })
})
