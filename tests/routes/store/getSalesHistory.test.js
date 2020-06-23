const request = require('supertest');
const server = require('../../../server');
const Product = require('../../../models/product');
const Seller = require('../../../models/seller');
const Store = require('../../../models/store');
const Cart = require('../../../models/cart');

let token;
let token2;
let storeId;
let product1Id;
let product2Id;

async function clearDb() {
	await Seller.deleteMany({});
	await Store.deleteMany({});
	await Cart.deleteMany({});
}

beforeAll(async () => {
	jest.setTimeout(30000);
	try {
		await clearDb();
		const response = await request(server).post('/api/auth/register').send({
			phone: '14692224343',
			password: 'password12345'
		});

		token = response.body.token;

		const response2 = await request(server).post('/api/auth/register').send({
			phone: '4692224341',
			password: 'password12345'
		});

		token2 = response2.body.token;

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
				name: 'Shoes1',
				description: 'A very nice',
				price: 500,
				stock: 10,
				images: [ 'mee.jpg', 'us.jpg' ]
			})
			.set('Authorization', token);
		product1Id = product1.body._id;

		const product2 = await request(server)
			.post('/api/store/products')
			.send({
				name: 'Shoes2',
				description: 'A very nice2',
				price: 5000,
				stock: 100,
				images: [ 'mee2.jpg', 'us2.jpg' ]
			})
			.set('Authorization', token);

		product2Id = product2.body._id;

		// add item to cart
		const cart = await request(server).post(`/api/store/${storeId}/cart`).send({
			agreedPrice: 40,
			total: 400,
			paidAmount: 400,
			checkedOut: true,
			email: 'test@gmail.com',
			contents: [ { product: product1Id, quantity: 3 }, { product: product2Id, quantity: 3 } ]
		});
	} catch (error) {
		console.error(error.name, error.message);
	}
});

describe('get sales history route', () => {
	it('should return store not found', async () => {
		const response = await request(server).get('/api/store/sales').set('Authorization', token2);
		expect(response.status).toBe(404);
		expect(response.body.message).toBeDefined();
		expect(response.body.message).toBe('No store found');
	});

	it('should return the sales history', async () => {
		const response = await request(server).get('/api/store/sales').set('Authorization', token);
		expect(response.status).toBe(200);
		expect(response.body.totalSales).toBe(400);
		expect(response.body.transactionDetails).toBeDefined();
	});
});
