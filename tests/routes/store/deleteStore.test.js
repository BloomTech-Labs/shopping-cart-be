const request = require('supertest')
const server = require('../../../server')
const Store = require('../../../models/store')

let token
let token2
let store_id
let store_id2

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

    // create store for seller 1
    const newStore = new Store({
      storeName: 'Stone &  Sticks',
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

    // create store for seller 2
    const newStore2 = new Store({
      storeName: 'icecreamfactory',
      ownerName: 'Johnny Walker',
      currency: 'Yen',
      imageUrl: 'some image',
      seller: response2.body.user.id
    })

    store_id2 = newStore2.id
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
    const res = await request(server).delete('/api/store/:store_id')
    expect(res.body).toEqual({ message: 'No credentials provided' })
    expect(res.status).toBe(400)
  })
  it('returns no store was found', async () => {
    const res = await request(server)
      .delete('/api/store/5dfd9f2b77846e05c835efae')
      .set('Authorization', token)
    expect(res.status).toBe(404)
    expect(res.body).toEqual({ message: 'No store was found' })
  })

  it('returns You can only delete your own store', async () => {
    const res = await request(server)
      .delete(`/api/store/${store_id2}`)
      .set('Authorization', token)
    expect(res.status).toBe(400)
    expect(res.body).toEqual({ message: 'You can only delete your own store' })
  })
  it('Store has been removed', async () => {
    const res = await request(server)
      .delete(`/api/store/${store_id2}`)
      .set('Authorization', token2)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Store has been removed' })
  })
})
