const request = require('supertest');
const server = require('../../../server');
const Product = require('../../../models/product');
const Seller = require('../../../models/seller');
const Store = require('../../../models/store');

let token;
let productId;

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
			phone: '14692328444',
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
		const product = await request(server)
			.post('/api/store/products')
			.send({
				productName: 'product1',
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);

		productId = product.body._id;
	} catch (error) {
		console.error(error.name, error.message);
	}
});

describe('delete a store', () => {
	it('returns No credentials provided', async () => {
		const res = await request(server).delete('/api/store/products/456774847');
		expect(res.body).toEqual({ message: 'No credentials provided' });
		expect(res.status).toBe(400);
	});
	it('returns no product was found', async () => {
		const res = await request(server)
			.delete('/api/store/products/5dfd9f2b77846e05c835efae')
			.set('Authorization', token);
		expect(res.status).toBe(404);
		expect(res.body).toEqual({ message: 'No product was found' });
	});
	it('returns Product has been removed', async () => {
		const res = await request(server).delete(`/api/store/products/${productId}`).set('Authorization', token);

		expect(res.status).toBe(200);
		expect(res.body).toEqual({ message: 'Product has been removed' });
	});
});
