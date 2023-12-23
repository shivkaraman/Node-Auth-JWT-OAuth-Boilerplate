const app = require('./app');
// const https = require('https');
const https = require('https');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const { connectToDB } = require('./services/mongo');
const PORT = process.env.PORT_NO;

const server = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    },
    app
);

async function startServer() {
    await connectToDB();
    server.listen(PORT, () => {
        console.log('Server is listening on port', PORT);
    });
}

startServer();
