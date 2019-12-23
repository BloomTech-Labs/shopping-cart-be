const request = require('supertest')
const server = require('../../../server')
const Store = require('../../../models/store')

let token
let token2
let storeName

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
        phone: '0903190035',
        password: 'password12345'
      })

    token = response1.body.token

    const response2 = await request(server)
      .post('/api/auth/register')
      .send({
        phone: '06023378722',
        password: 'password12345'
      })

    token2 = response2.body.token

    // create store for seller 2
    const newStore2 = new Store({
      storeName: 'icecreamfactory',
      ownerName: 'Johnny Walker',
      currency: 'Yen',
      imageUrl: 'some image',
      seller: response2.body.user.id
    })
    storeName = newStore2.storeName
    newStore2
      .save()
      .then(store => {})
      .catch(err => console.log(err))
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('delete a store', () => {
  it('returns No credentials provided', async () => {
    const res = await request(server).delete('/api/store')
    expect(res.body).toEqual({ message: 'No credentials provided' })
    expect(res.status).toBe(400)
  })
  it('returns no store was found', async () => {
    const res = await request(server)
      .delete('/api/store')
      .set('Authorization', token)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({
      message: 'There is no store associated with this account'
    })
  })

  it('Store has been removed', async () => {
    const res = await request(server)
      .delete('/api/store')
      .set('Authorization', token2)
    expect(res.status).toBe(200)

    expect(res.body).toEqual({
      message: `${storeName} store has been removed`
    })
  })
})

afterAll(async () => {
  try {
    await clearDb()
  } catch (error) {
    console.error(error.name, error.message)
  }
})
