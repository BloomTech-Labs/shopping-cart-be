const request = require('supertest');
const server = require('../../../server');
const Seller = require('../../../models/seller');

async function clearDb() {
	await Seller.deleteMany({});
}

beforeAll(async () => {
	try {
		await clearDb();
	} catch (error) {
		console.error(error.name, error.message);
	}
});

beforeEach(() => {
	jest.setTimeout(10000);
});

describe('registerSeller', () => {
	it('expects 400 response if no user register data', async () => {
		const res = await request(server).post('/api/auth/register');
		expect(res.status).toBe(400);
	});
	it('expects user already exists error message', async () => {
		await Seller.create({
			phone: '2348124120355',
			password: 'Password12345'
		});
		const res = await request(server).post('/api/auth/register').send({
			phone: '2348124120355',
			password: 'Password12345'
		});
		expect(res.body).toEqual({ message: 'User already exists' });
	});

	it('expects Password field is required error message', async () => {
		const res = await request(server).post('/api/auth/register').send({
			phone: '2348124120355'
		});
		expect(res.status).toBe(400);
		expect(res.body).toEqual({ password: 'Password field is required' });
	});
	it('expects Password length is not less than 6', async () => {
		const res = await request(server).post('/api/auth/register').send({
			phone: '2348124120355',
			password: 'Pass'
		});
		expect(res.status).toBe(400);
		expect(res.body).toEqual({
			password: 'Password must be at least 6 characters'
		});
	});
	it('expects Phone Number is invalid error message ', async () => {
		const res = await request(server).post('/api/auth/register').send({
			phone: 'tolu',
			password: 'Password12345'
		});
		console.log('Phone number invalid', res.status);
		console.log('Phone number is invalid', res.body);
		expect(res.status).toBe(400);
		expect(res.body).toEqual({ phone: 'Phone Number is invalid' });
	});
	it('expects Phone Number is invalid error message ', async () => {
		const res = await request(server).post('/api/auth/register').send({
			phone: '',
			password: 'Password12345'
		});
		expect(res.status).toBe(400);
		expect(res.body).toEqual({ phone: 'Phone Number field is required' });
	});
	it('checks if user has been created successfully with a token being returned', async () => {
		const res = await request(server).post('/api/auth/register').send({
			phone: '2347031900054',
			password: 'Password12345'
		});

		const { token } = res.body;
		expect(res.status).toBe(201);
		expect(token).toBeDefined();
	});
});
