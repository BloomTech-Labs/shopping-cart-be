const request = require('supertest');
const server = require('../../../server');
const Product = require('../../../models/product');
const Store = require('../../../models/store');

let token;
let product_id;
let storeId;

async function clearDb() {
	await Store.deleteMany({});
	await Product.deleteMany({});
}

beforeEach(() => {
	jest.setTimeout(10000);
});

beforeAll(async () => {
	jest.setTimeout(10000);
	try {
		await clearDb();
		const response = await request(server).post('/api/auth/register').send({
			phone: '146975254232',
			password: 'password12345'
		});
		token = response.body.token;

		const res = await request(server)
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
				color: 'sdfsdf',
				seller: response.body.user.id
			})
			.set('Authorization', token);
		storeId = res.body.saved._id;
	} catch (error) {
		console.error(error.name, error.message);
	}
});

describe('get all products', () => {
	test('should return no products found', async () => {
		const response = await request(server).get('/api/store/5e00a47af069c4278845cfb1/products');
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'No products found' });
	});

	test('should return one product', async () => {
		const res = await request(server)
			.post('/api/store/products')
			.send({
				productName: 'product1',
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		product_id = res.body._id;

		const response = await request(server).get(`/api/store/${storeId}/products`);
		expect(response.status).toBe(200);
		expect(response.body).toHaveLength(1);
		expect(response.body[0]).toHaveProperty('description', 'some description here');
		expect(response.body[0]).toBeTruthy();
	});
});

describe('get a product', () => {
	test('should return one product by its id', async () => {
		const response = await request(server).get(`/api/store/products/${product_id}`);
		expect(response.status).toBe(200);
	});
	test('should return no products found', async () => {
		const response = await request(server).get('/api/store/products/5e03ae9b7cfc69bc054f6156');
		expect(response.status).toBe(404);
		expect(response.body).toEqual({ message: 'No product found' });
	});
});
