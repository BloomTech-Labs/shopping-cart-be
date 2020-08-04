const request = require('supertest');
const server = require('../../../server');
// const AddOrder = require('../../../models/orders');

beforeEach(() => {
	jest.setTimeout(10000);
});

describe('addOrderTest', () => {

	it('should return a JSON object from the index route', async () => {
		const response = await request(server).post('/api/store/order').send({
			orderItem: [
				{
					product: '5f0e429370d3706be2c97b14',
					quantity: 12,
					chosenVariant: {
						price: 2
					}
				},
				{
					product: '5f0e4b2061d7806ef6266210',
					quantity: 10,
					chosenVariant: {
						price: 50
					}
				}
			],
			orderStatus: 'Ready',
			orderCreated: ''
		});
		expect(response.type).toEqual('application/json');
	});
});
