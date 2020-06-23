const request = require('supertest');
const server = require('../../../server');
const Store = require('../../../models/store');
const Seller = require('../../../models/seller');

let token;
async function clearDb() {
	await Store.deleteMany({});
	await Seller.deleteMany({});
}

// beforeEach(() => {
//   jest.setTimeout(10000);
// });

beforeAll(async () => {
	jest.setTimeout(10000);
	try {
		clearDb();
		const response1 = await request(server).post('/api/auth/register').send({
			phone: '2347031900037',
			password: 'password12345'
		});

		token = response1.body.token;

		const response3 = await request(server)
			.post('/api/store')
			.send({
				businessName: 'My business is dopeness then yours',
				ownerName: 'boombakla shops',
				address: '205 goldenrain dr',
				secondAddress: 'MYHOME',
				city: 'Wylie',
				state: 'Texas',
				zipcode: '75098',
				hours: '10am-1pm',
				curbHours: '10am-1pm',
				logo: 'booboobooboo',
				color: '#2323423'
			})
			.set('Authorization', token);

		storeId = response3.body.saved._id;
	} catch (error) {
		console.error(error.name, error.message);
	}
});

describe('edit store', () => {
	it('should work', async () => {
		expect(1).toBe(1);
	});

	it('should return no credentials provided', async () => {
		const response = await request(server).put('/api/store/account');
		expect(response.status).toBe(400);
		expect(response.body).toEqual({ message: 'No credentials provided' });
	});

	it('should return all fields required', async () => {
		const response = await request(server).put('/api/store/account').send({}).set('Authorization', token);
		expect(response.status).toBe(400);
		expect(response.body).toBeDefined();
		expect(response.body).toEqual({
			stripeId: 'StripeId is required'
		});
	});

	it('should return edited store info', async () => {
		const response = await request(server)
			.put('/api/store/account')
			.send({
				stripeId: '6789iuhriuopvveeer'
			})
			.set('Authorization', token);
		expect(response.status).toBe(200);
		expect(response.body).toBeDefined();
	});
});
