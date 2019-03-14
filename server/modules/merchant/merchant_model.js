const mongoose = require('mongoose')
const { Schema } = mongoose

const merchantSchema = new Schema({
	name: String,
	feedUrl: String,
	siteUrl: String,
	creditBalance: {
		type: Number,
		default: 0
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product'
		}
	]
})

const Merchant = mongoose.model('merchant', merchantSchema)

module.exports = {
	Merchant
}
