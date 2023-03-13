const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  port: process.env.TYPEORM_PORT,
  database: process.env.TYPEORM_DATABASE,
});

module.exports = { appDataSource };
