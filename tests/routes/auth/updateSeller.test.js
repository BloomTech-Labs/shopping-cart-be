const request = require('supertest');
const server = require('../../../server');
const Seller = require('../../../models/seller');

let token;

async function clearDb() {
	await Seller.deleteMany({});
}

beforeAll(async () => {
	jest.setTimeout(10000);

	try {
		await clearDb();
		const response = await request(server).post('/api/auth/register').send({
			phone: '2347031900078',
			password: 'password12345'
		});

		token = response.body.token;
	} catch (error) {
		console.error(error.name, error.message);
	}
});

describe('update seller phone', () => {
	it('returns No credentials provided', async () => {
		const res = await request(server).put('/api/auth/phone');
		expect(res.body).toEqual({ message: 'No credentials provided' });
		expect(res.status).toBe(400);
	});
	it('returns the updated number', async () => {
		const res = await request(server)
			.put('/api/auth/phone')
			.send({ phone: '234703190007878908' })
			.set('Authorization', token);
		console.log('Return the update number', res.body);
		expect(res.status).toBe(400);
	});
});
