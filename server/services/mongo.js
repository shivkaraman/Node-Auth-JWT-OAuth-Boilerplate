const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connection.once('open', () => {
    console.log('Connected to Mongo DB');
});

mongoose.connection.once('error', (err) => {
    console.log('Error connecting to database: ', err);
});

async function connectToDB() {
    await mongoose.connect(MONGO_URI);
}

async function disconnectDB() {
    await mongoose.disconnect();
}

module.exports = {
    connectToDB,
    disconnectDB,
};
