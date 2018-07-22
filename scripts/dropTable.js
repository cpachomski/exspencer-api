require('dotenv').config();
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const db = require('../src/db');

const tableName = process.argv[2];
const modelsPath = path.resolve(__dirname, '../src/api/models');
const models = fs.readdirSync(modelsPath).map(f => f);

if (!models.includes(tableName)) {
  throw new Error(
    `Table name ${chalk.red(tableName)} is not recognized in API`
  );
}

(async () => {
  try {
    const response = await db.query(`DROP TABLE ${tableName};`);
    console.log(chalk.green(`Table ${tableName} successfully dropped\n`));
  } catch (e) {
    console.log(e);
  }
})();
