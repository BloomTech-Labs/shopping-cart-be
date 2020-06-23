const request = require('supertest');
const server = require('../../../server');
const Store = require('../../../models/store');
const Seller = require('../../../models/seller');

let token;
let token2;
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
		await clearDb();
	} catch (error) {
		console.error(error.name, error.message);
	}
});

afterAll(async () => {
	try {
		await clearDb();
	} catch (error) {
		console.error(error.name, error.message);
	}
});
describe('create a new store', () => {
	it('returns No credentials provided message', async () => {
		const res = await request(server).post('/api/store');
		expect(res.status).toBe(400);
		expect(res.body).toEqual({ message: 'No credentials provided' });
	});
});

describe('test', () => {
	beforeAll(async () => {
		try {
			clearDb();
			const response1 = await request(server).post('/api/auth/register').send({
				phone: '2347031900033',
				password: 'password12345'
			});

			token = response1.body.token;

			const response2 = await request(server).post('/api/auth/register').send({
				phone: '23470319000',
				password: 'password12345'
			});

			token2 = response2.body.token;

			Store.create({
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
				color: 'sdfsdf',
				seller: response1.body.user.id
			});
		} catch (error) {
			console.error(error.name, error.message);
		}
	});
	it('should create a new store and return 201 OK', async () => {
		const response = await request(server)
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
			.set('Authorization', token2);
		expect(response.status).toEqual(400);
	});
	it('A store name does exists, cannot create another one', async () => {
		const response = await request(server)
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
			.set('Authorization', token2);

		expect(response.body).toEqual({ message: 'Store name already exists' });
	});
	it('Cannot create more than one store', async () => {
		const response = await request(server)
			.post('/api/store')
			.send({
				businessName: 'Book&Sticks',
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

		expect(response.status).toBe(400);
		expect(response.body).toBeDefined();
		expect(response.body).toEqual({
			message: 'You can not create more than one store'
		});
	});
});
