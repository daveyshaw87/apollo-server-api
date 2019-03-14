const { gql } = require('apollo-server')
const casual = require('casual')
const { Category } = require('./category_model')
const { Product } = require('../product/product_model')

const typeDefs = gql`
	extend type Query {
		category(id: ID): Category
		categories: [Category]
	}

	type Category {
		_id: ID
		categoryName: String
		updatedAt: String
		slug: String
		products: [Product]
	}

	input CategoryInput {
		categoryName: String
		slug: String
		products: [String]
	}

	type Mutation {
		addCategory(categoryName: String, slug: String): Category
		editCategory(id: String!, input: CategoryInput!): Category
		deleteCategory(id: String!): Category
	}
`

const resolvers = {
	Query: {
		category: async (_, { id }) => {
			const category = await Category.findById(id)
			return category
		},

		categories: async (_, { filter = {} }) => {
			const categories = await Category.find({}, null, filter).lean()
			return categories.map(Category)
		}
	},

	Mutation: {
		addCategory: async (_, args) => {
			try {
				let response = await Category.create(args)
				return response
			} catch (e) {
				return e.message
			}
		},
		editCategory: async (_, { id, input }) => {
			const category = await Category.findByIdAndUpdate(id, input).lean()
			return category
		},
		deleteCategory: async (_, { id }) => {
			const category = await Category.findByIdAndRemove(id).lean()
			return category ? category : null
		}
	},

	Category: {
		async products(parent, arg) {
			const products = await Product.find({ categories: parent._id }).lean()
			return products
		}
	}
}

module.exports = {
	typeDefs,
	resolvers
}
