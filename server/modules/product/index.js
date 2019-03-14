const { gql } = require('apollo-server')
const { Product } = require('./product_model')
const { Merchant } = require('../merchant/merchant_model')
const { Category } = require('../category/category_model')

const typeDefs = gql`
	extend type Query {
		product(id: ID!): Product
		products(filter: ProductFilterInput): [Product]
	}

	type Product {
		_id: ID
		productName: String
		price: Float
		updatedAt: String!
		merchant: Merchant
		categories: [Category]
	}

	input ProductInput {
		productName: String
		price: Float
		merchant: String
		categories: [String]
	}

	extend type Merchant {
		products: [Product]
	}

	input ProductFilterInput {
		limit: Int
	}

	extend type Mutation {
		addProduct(productName: String, price: Float, merchant: String, categories: [String]): Product
		addProductToMerchant(id: String!, merchantId: String!): Product
		deleteProduct(id: String!): Product
		editProduct(id: String!, input: ProductInput!): Product
	}
`

const resolvers = {
	Query: {
		product: async (_, { id }) => {
			const product = await Product.findById(id)
			return product
		},

		products: async (_, { filter = {} }) => {
			const products = await Product.find({}, null, filter).lean()
			return products.map(Product)
		}
	},

	Mutation: {
		addProduct: async (_, args) => {
			try {
				let response = await Product.create(args)
				return response
			} catch (e) {
				return e.message
			}
		},

		addProductToMerchant: async (_, { id, merchantId }) => {
			const product = await Product.findByIdAndUpdate(id, {merchant: merchantId}).lean()
			return product
		},

		editProduct: async (_, { id, input }) => {
			const product = await Product.findByIdAndUpdate(id, input).lean()
			return product
		},
		deleteProduct: async (_, { id }) => {
			const product = await Product.findByIdAndRemove(id).lean()
			return product ? product : null
		}
	},

	Product: {
		async merchant(parent, arg) {
			const merchant = await Merchant.findById(parent.merchant).lean()
			return merchant
		},
		async categories(parent, arg) {
			const categories = await Category.find( {_id : parent.categories}) .lean()
			return categories
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}
