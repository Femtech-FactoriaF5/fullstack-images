// eslint-disable-next-line no-undef
const env = process.env;

export const config = {
    url: env.MONGO_URL || 'mongodb://localhost:27017',
    dbName: env.MONGO_DB_NAME || 'test',
};