const { gql } = require('apollo-server')
const { Voucher } = require('./voucher_model')
const { Merchant } = require('../merchant/merchant_model')
const { Category } = require('../category/category_model')

const typeDefs = gql`
	extend type Query {
		voucher(id: ID!): Voucher
		vouchers(filter: VoucherFilterInput): [Voucher]
	}

	type Voucher {
		_id: ID
		title: String
		description: String
		offerType: String
		voucherCode: String
		savingValue: String
		deepUrl: String
		siteUrl: String
		affiliateNetwork: String
		startDate: String
		endDate: String
		updatedAt: String!
		merchant: Merchant
		categories: [Category]
	}

	extend type Merchant {
		vouchers: [Voucher]
	}

	input VoucherInput {
		title: String
		description: String
		offerType: String
		voucherCode: String
		savingValue: String
		deepUrl: String
		siteUrl: String
		affiliateNetwork: String
		startDate: String
		endDate: String
		updatedAt: String
		merchant: String
		categories: [String]
	}

	input VoucherFilterInput {
		limit: Int
	}

	extend type Mutation {
		addVoucher(input: VoucherInput!): Voucher
		editVoucher(id: String!, input: VoucherInput!): Voucher
		deleteVoucher(id: String!): Voucher
	}
`

const resolvers = {
	Query: {
		voucher: async (_, { id }) => {
			const voucher = await Voucher.findById(id)
			return voucher
		},

		vouchers: async (_, { filter = {} }) => {
			const vouchers = await Voucher.find({}, null, filter).lean()
			return vouchers.map(Voucher)
		}
	},

	Mutation: {
		addVoucher: async (_, args) => {
			try {
				let response = await Voucher.create(args.input)
				return response
			} catch (e) {
				return e.message
			}
		},

		editVoucher: async (_, { id, input }) => {
			const voucher = await Voucher.findByIdAndUpdate(id, input).lean()
			return voucher
		},
		deleteVoucher: async (_, { id }) => {
			const voucher = await Voucher.findByIdAndRemove(id).lean()
			return voucher ? voucher : null
		}
	},

	Voucher: {
		async merchant(parent, arg) {
			const merchant = await Merchant.findById(parent.merchant).lean()
			return merchant
		},
		async categories(parent, arg) {
			const categories = await Category.find({ _id: parent.categories }).lean()
			return categories
		}
	},
	Merchant: {
		async vouchers(parent, arg) {
			const vouchers = await Voucher.find({ merchant: { _id: parent._id } }).lean()
			return vouchers
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}
