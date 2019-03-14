const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
	productName: String,
	price: Number,

	updatedAt: {
		type: Date,
		default: Date.now
		
	},
	merchant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Merchant'
	},
	categories: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category'
	}]
})

productSchema.set('toObject', { virtuals: true })
const Product = mongoose.model('product', productSchema)

module.exports = {
	Product
}
