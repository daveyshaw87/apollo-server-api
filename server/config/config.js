const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://ewroko33:nKZA2KsUhf3AcpS@ds145484.mlab.com:45484/withseismic';

mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`));