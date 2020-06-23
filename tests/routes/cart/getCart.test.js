const request = require('supertest');
const server = require('../../../server');
const Product = require('../../../models/product');
const Seller = require('../../../models/seller');
const Store = require('../../../models/store');
const Cart = require('../../../models/cart');

let token;
let cartId;
let storeId;
let product1Id;

async function clearDb() {
	await Seller.deleteMany({});
	await Product.deleteMany({});
	await Store.deleteMany({});
	await Cart.deleteMany({});
}
it('should return approved cart', async () => {
	const response = await request(server);
});
beforeEach(() => {
	jest.setTimeout(10000);
});

beforeAll(async () => {
	jest.setTimeout(10000);
	try {
		await clearDb();
		const response = await request(server).post('/api/auth/register').send({
			phone: '14692324432',
			password: 'password12345'
		});

		token = response.body.token;

		const store = await request(server)
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
		storeId = store.body.saved._id;

		//   create products
		const product1 = await request(server)
			.post('/api/store/products')
			.send({
				productName: 'product1',
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);
		product1Id = product1.body._id;

		const product2 = await request(server)
			.post('/api/store/products')
			.send({
				productName: 'product1',
				price: 200,
				category: 'some category here',
				description: 'some description here',
				images: [ 'boom BOOM' ]
			})
			.set('Authorization', token);

		product2Id = product2.body._id;

		// add item to cart
		const cart = await request(server).post(`/api/store/${storeId}/cart`).send({
			agreedPrice: 40,
			total: 400,
			email: 'test@gmail.com',
			contents: [ { product: product1Id, quantity: 3 }, { product: product2Id, quantity: 3 } ]
		});

		cartId = cart.body.result._id;
	} catch (error) {
		console.error(error.name, error.message);
	}
});

describe('get cart contents', () => {
	it('should return cart not found', async () => {
		const response = await request(server).get('/api/store/cart/5e1ee0099f037d24abba6aa9');
		expect(response.status).toBe(404);
		expect(response.body.message).toBeDefined();
		expect(response.body).toEqual({ message: 'No cart found' });
	});

	xit('should return found cart with details', async () => {
		const response = await request(server).get(`/api/store/cart/${cartId}`);
		expect(response.status).toBe(200);
		expect(response.body.contents).toBeDefined();
		expect(response.body.checkedOut).toBeDefined();
		expect(response.body.agreedPrice).toBeDefined();
		expect(response.body.total).toBeDefined();
		expect(response.body.storeId).toBeDefined();
		expect(response.body.lock).toBeDefined();
		expect(response.body.finalLock).toBeDefined();
	});

	it('should return type error with wrong id', async () => {
		const response = await request(server).get('/api/store/cart/wrongId/');
		expect(response.status).toBe(500);
		expect(response.body).toBeDefined();
	});
});
