const request = require('supertest');
const server = require('../../../server');
const Product = require('../../../models/product');
const Seller = require('../../../models/seller');
const Store = require('../../../models/store');

let token;

async function clearDb() {
	await Seller.deleteMany({});
	await Product.deleteMany({});
	await Store.deleteMany({});
}
beforeEach(() => {
	jest.setTimeout(10000);
});
beforeAll(async () => {
	jest.setTimeout(10000);
	try {
		await clearDb();
		const response = await request(server).post('/api/auth/register').send({
			phone: '14602233422',
			password: 'password12345'
		});

		token = response.body.token;

		await request(server)
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
	} catch (error) {
		console.error(error.name, error.message);
	}
});
describe('add new products', () => {
	it('successfully creates a product', async () => {
		const response = await request(server)
			.post('/api/store/products')
			.send({
				productName: 'product1',
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		console.log('Add new Product Status', response.status);
		console.log('Add new Product Body', response.body);

		expect(response.status).toBe(200);
		expect(response.body.productName).toBe('product1');
		expect(response.body.price).toBe(200);
	});

	it('should return Name is required', async () => {
		const response = await request(server)
			.post('/api/store/products')
			.send({
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		expect(response.status).toBe(400);
		expect(response.body).toBeDefined();
	});

	it('should return price is required', async () => {
		const response = await request(server)
			.post('/api/store/products')
			.send({
				productName: 'product1',
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		expect(response.status).toBe(400);
		expect(response.body).toBeDefined();
	});

	it('should return price cant be less than 0', async () => {
		const response = await request(server)
			.post('/api/store/products')
			.send({
				productName: 'product1',
				price: -200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		expect(response.status).toBe(400);
		expect(response.body).toBeDefined();
	});
});
