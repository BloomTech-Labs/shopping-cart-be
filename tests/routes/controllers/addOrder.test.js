const request = require('supertest');
const server = require('../../../server');
const mongoose = require('mongoose')
// const server = require('../../../server');
// const Product = require('../../../models/product');
// const Seller = require('../../../models/seller');
// const Store = require('../../../models/store');
const AddOrder = require('../../../models/orders')

describe( "something here", ()=> { 
    it('should return a JSON object from the index route', async () => {
    const response = await request(server).get('/api/store/order/1');
    expect(response.type).toEqual('application/json');
  });
})

console.log(server)
  

// beforeAll(async () => {
// 	jest.setTimeout(30000);
// 	try {
// 		await clearDb();
// 		const response = await request(server)
// 			.post('/api/auth/order')
// 			.send({storeId, orderItem:[{product}]});

// 		token = response.body.token;

// 		const store = await request(server)
// 			.post('/api/store')
// 			.send({
// 				businessName: 'Book&Sticks',
// 				ownerName: 'Jane Doe',
// 				address: '205 Boom Town',
// 				secondAddress: 'BOOmTOWN, TP',
// 				city: 'BOOM BOOM',
// 				state: 'BAFFF',
// 				zipcode: '75098',
// 				hours: '3PM',
// 				curbHours: '2PM',
// 				logo: 'asdfasdf',
// 				color: 'sdfsdf'
// 			})
// 			.set('Authorization', token);

// 		storeId = store.body.saved._id;

// 		//   create products
// 		const product1 = await request(server)
// 			.post('/api/store/products')
// 			.send({
// 				productName: 'product1',
// 				price: 200,
// 				category: 'some category here',
// 				description: 'some description here',
// 				images: [ 'boom BOOM' ]
// 			})
// 			.set('Authorization', token);
// 		product1Id = product1.body._id;

// 		const product2 = await request(server)
// 			.post('/api/store/products')
// 			.send({
// 				productName: 'product1s',
// 				price: 200,
// 				category: 'some category here',
// 				description: 'some description here',
// 				images: [ 'boom BOOM' ]
// 			})
// 			.set('Authorization', token);

// 		product2Id = product2.body._id;
// 	} catch (error) {
// 		console.error(error.name, error.message);
// 	}
// });

// describe('add item to cart', () => {
// 	it('should work', async () => {
// 		expect(1).toBe(1);
// 	});

// 	it('should return agreed price and total fields required', async () => {
// 		const response = await request(server).post(`/api/store/${storeId}/cart`).send({});
// 		expect(response.status).toBe(400);
// 		expect(response.body.agreedPrice).toBeDefined();
// 		expect(response.body.total).toBeDefined();
// 	});

// 	it('should return email required', async () => {
// 		const response = await request(server).post(`/api/store/${storeId}/cart`).send({ total: 34, agreedPrice: 34 });
// 		expect(response.status).toBe(400);
// 		expect(response.body.email).toBeDefined();
// 	});

// 	xit('should return store not found', async () => {
// 		const response = await request(server)
// 			.post(`/api/store/${product1Id}/cart`)
// 			.send({ total: 34, agreedPrice: 34, email: 'johndoe@gmail.com' });
// 		expect(response.status).toBe(404);
// 		expect(response.body.message).toBeDefined();
// 	});

// 	xit('should return a saved cart', async () => {
// 		const response = await request(server)
// 			.post(`/api/store/${storeId}/cart`)
// 			.send({ total: 34, agreedPrice: 34, email: 'johndoe@gmail.com' });
// 		expect(response.status).toBe(200);
// 		expect(response.body.result).toBeDefined();
// 	});

// 	it('should return a server related error', async () => {
// 		const response = await request(server)
// 			.post('/api/store/wrongid/cart')
// 			.send({ total: 34, agreedPrice: 34, email: 'johndoe@gmail.com' });
// 		expect(response.status).toBe(500);
// 		expect(response.body).toBeDefined();
// 	});
// });