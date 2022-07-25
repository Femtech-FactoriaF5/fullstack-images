import {MongoClient} from 'mongodb';

const connection = config =>
	MongoClient.connect(config.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

export default connection;


