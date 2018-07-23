const fs = require('fs');
const path = require('path');
const Database = require('./db');
const chalk = require('chalk');

const db = new Database({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DBNAME,
  port: process.env.RDS_PORT
});

if (['production', 'development'].includes(process.env.NODE_ENV)) {
  db.connection.connect(err => {
    if (err) {
      throw new Error(`Database connection failed: ${err}`);
    }

    console.log(chalk.cyan(`Creating tables if need be...`));
    fs.readdirSync(path.resolve(__dirname, '../api/models'))
      .filter(f => ['expenses', 'users', 'tags', 'accounts'].includes(f))
      .forEach(f => {
        const { createTable } = require(`../api/models/${f}/model`);

        db.query(createTable, (err, res, fields) => {
          if (err) {
            throw new Error(`${f}.createTable: ${err}`);
          } else {
            console.log(chalk.cyan(`${f}.createTable Success!`));
          }
        });
      });
  });
}

module.exports = db;
