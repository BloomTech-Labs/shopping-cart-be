const request = require('supertest');
const server = require('../../../server');
const Product = require('../../../models/product');
const Seller = require('../../../models/seller');

let token;
let testProduct;
let wrongId;

async function clearDB() {
	await Product.deleteMany({});
	await Seller.deleteMany({});
}

beforeEach(() => {
	jest.setTimeout(10000);
});

beforeAll(async () => {
	jest.setTimeout(10000);
	try {
		await clearDB();
		const newProduct = new Product({
			productName: 'product1',
			price: 200,
			category: 'some category here',
			description: 'some description here',
			images: [ 'boom BOOM' ],
			storeId: '5dff0f250fe71e495b5c317f'
		});
		testProduct = await newProduct.save();

		await testProduct.save();

		const response = await request(server).post('/api/auth/register').send({
			phone: '14692322323',
			password: 'password12345'
		});
		token = response.body.token;
		console.log('original', token);
		wrongId = response.body.user.id;
	} catch (err) {
		console.error(err.name, err.message);
	}
});

describe('edit product', () => {
	it('returns No credentials provided message', async () => {
		const res = await request(server).put(`/api/store/products/${testProduct._id}`);
		expect(res.status).toBe(400);
		expect(res.body).toEqual({ message: 'No credentials provided' });
	});

	it('should return name is required', async () => {
		const res = await request(server)
			.put(`/api/store/products/${testProduct._id}`)
			.send({
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		expect(res.status).toBe(400);
	});

	it('should return price is required', async () => {
		const res = await request(server)
			.put(`/api/store/products/${testProduct.id}`)
			.send({
				productName: 'product1',
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ],
				storeId: '5dff0f250fe71e495b5c317f'
			})
			.set('Authorization', token);
		expect(res.status).toEqual(400);
	});

	it('should return updated product', async () => {
		const res = await request(server)
			.put(`/api/store/products/${testProduct.id}`)
			.send({
				productName: 'product name',
				description: 'test product',
				price: 499
			})
			.set('Authorization', token);
		expect(res.status).toBe(200);
		expect(res.body).toBeDefined();
	});

	it('should return product not found', async () => {
		const res = await request(server)
			.put(`/api/store/products/${wrongId}`)
			.send({
				productName: 'product1',
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		expect(res.status).toBe(404);
		expect(res.body).toBeDefined();
		expect(res.body).toEqual({ message: 'No product was found' });
	});
});
