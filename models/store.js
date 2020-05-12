const mongoose = require('mongoose');
const storeSchema = mongoose.Schema({
	businessName: {
		type: String,
		required: true,
		trim: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Seller'
	},
	businessInfo: {
		type: Object,
		detailedInfo: {
			streetAddress: { type: String },
			suitNumber: { type: String },
			city: { type: String },
			state: { type: String },
			zipCode: { type: Number },
			hoursOfOperations: {
				day: { type: Date }, //this gives the mon - sun time frame
				periods: [
					{
						start: { type: Date },
						end: { type: Date }
					}
				]
			},
			required: [ 'streetNumber', 'city', 'state', 'zipCode' ],
			trim: [ 'streetNumber', 'suitNumber', 'city', 'state', 'zipCode' ]
		}
	},
	imageUrl: { type: String },
	register_date: {
		type: Date,
		default: Date.now
	},
	stripeId: { type: String }
});
const Store = mongoose.model('store', storeSchema);
module.exports = Store;
