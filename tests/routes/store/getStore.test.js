const request = require('supertest');
const server = require('../../../server');
const Store = require('../../../models/store');
const Seller = require('../../../models/seller');

let token;
let token2;
let storeId;

async function clearDb() {
	await Store.deleteMany({});
	await Seller.deleteMany({});
}
beforeEach(() => {
	jest.setTimeout(10000);
});
beforeAll(async () => {
	jest.setTimeout(10000);
	try {
		clearDb();
		const response = await request(server).post('/api/auth/register').send({
			phone: '2347031900053',
			password: 'password12345'
		});

		token = response.body.token;

		const response2 = await request(server).post('/api/auth/register').send({
			phone: '2347031900153',
			password: 'password12345'
		});

		token2 = response2.body.token;

		const response3 = await request(server)
			.post('/api/store')
			.send({
				businessName: 'Book&Sticks',
				ownerName: 'Jane Doe',
				address: '205 Boom Town',
				secondAddress: 'BOOmTOWN, TP',
				city: 'BOOM BOOM',
				state: 'BAFFF',
				zipcode: '75098',
				hours: '3PM',
				curbHours: '2PM',
				logo: 'asdfasdf',
				color: 'sdfsdf'
			})
			.set('Authorization', token);

		storeId = response3.body.saved._id;
	} catch (error) {
		console.error(error.name, error.message);
	}
});

describe('get a store', () => {
	it('Return a store (authed)', async () => {
		const res = await request(server).get('/api/store').set('Authorization', token);
		console.log('Return a store', res.status);
		console.log('Return a Store', res.body);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('businessName', 'Book&Sticks');
	});
	it('Return a store (unauthed)', async () => {
		const res = await request(server).get(`/api/store/${storeId}`);
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty('businessName', 'Book&Sticks');
	});
	it('Return No store with that id', async () => {
		const res = await request(server).get('/api/store/123456');
		expect(res.status).toBe(404);
		expect(res.body).toHaveProperty('message', 'There is no store with that id');
	});
	it('Return No store found', async () => {
		const res = await request(server).get('/api/store').set('Authorization', token2);
		expect(res.status).toBe(404);
	});
});
