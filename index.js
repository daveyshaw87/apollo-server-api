const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const app = express()
const path = require('path');

require('./server/config/config')

const server = new ApolloServer({
	introspection: true,
	playground: true,
	modules: [
		require('./server/modules/product'),
		require('./server/modules/merchant'),
		require('./server/modules/voucher'),
		require('./server/modules/category')
	]
})


// Use the Express application as middleware in Apollo server
server.applyMiddleware({ app })

const port = process.env.PORT || 8080

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
// 	res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });

app.listen({ port: port }, () => {
	console.log(`Server running on http://localhost:${port}${server.graphqlPath}`);
  });