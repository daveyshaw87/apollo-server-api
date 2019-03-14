const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
	categoryName: String,
	slug: String,
	updatedAt: { type: Date, default: Date.now },
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Merchant'
		}
	]
})

const Category = mongoose.model('category', categorySchema)

module.exports = {
	Category
}
