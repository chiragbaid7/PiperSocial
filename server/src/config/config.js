const process = require('process');
const path = require('path');
require('dotenv').config({path: path.join(__dirname,'../../.env')});

module.exports = {
    development: {
        database: process.env.DATABASE,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        dialect : process.env.DIALECT,
        host: process.env.HOST,
        db_port: process.env.DB_PORT,
        port: process.env.PORT,
        privateKey: process.env.privateKey,
        access_key_id: process.env.ACCESS_KEY_ID,
        secret_access_key: process.env.SECRET_ACCESS_KEY,
        region: process.env.REGION
    }
}