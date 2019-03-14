const { gql } = require('apollo-server')
const { Merchant } = require('./merchant_model')
const { Product } = require('../product/product_model')

const typeDefs = gql`
	extend type Query {
		merchant(id: ID): Merchant
		merchants: [Merchant]
		getProducts(id: ID): [Product]
	}

	type Merchant {
		_id: ID
		name: String
		feedUrl: String
		siteUrl: String
		creditBalance: Float
		updatedAt: String

	}

	input MerchantInput {
		name: String
		feedUrl: String
		siteUrl: String
		creditBalance: Float
	}

	extend type Mutation {
		addMerchant(name: String, feedUrl: String, siteUrl: String, creditBalance: Float): Merchant
		editMerchant(id: String!, input: MerchantInput!): Merchant
		deleteMerchant(id: String!): Merchant
	}
`

const resolvers = {
	Query: {
		merchant: async (_, { id }) => {
			const merchant = await Merchant.findById(id)
			return merchant
		},

		merchants: async (_, { filter = {} }) => {
			const merchants = await Merchant.find({}, null, filter).lean()
			return merchants.map(Merchant)
		},

		getProducts: async (_,{ id }) => {
			const products = await Product.find({ merchant : { _id: id}}).lean()
			return products.map(Product)
		}
	},

	Mutation: {
		addMerchant: async (_, args) => {
			try {
				let response = await Merchant.create(args)
				return response
			} catch (e) {
				return e.message
			}
		},
		editMerchant: async (_, { id, input }) => {
			const merchant = await Merchant.findByIdAndUpdate(id, input).lean()
			return merchant
		},
		deleteMerchant: async (_, { id }) => {
			const merchant = await Merchant.findByIdAndRemove(id).lean()
			return merchant ? merchant : null
		}
	},

	Merchant: {
		async products(parent, arg) {
			const products = await Product.find({merchant : { _id : parent._id}}).lean()

			return products
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}
