const mongoose = require('mongoose')
const { Schema } = mongoose

const voucherSchema = new Schema({
	title: String,
	description: String,
	offerType: String,
	voucherCode: String,
	deepUrl: String,
	siteUrl: String,
	affiliateNetwork: String,
	savingValue: String,
	startDate: {
		type: Date,
		default: Date.now	
	},
	endDate: {
		type: Date
	},
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

voucherSchema.set('toObject', { virtuals: true })
const Voucher = mongoose.model('voucher', voucherSchema)

module.exports = {
	Voucher
}
