const db = require('../../../db');

const MODEL = 'expenses';

const create = async ({ id, userId, cost }) => {
  db.query(
    `
        INSERT INTO ${MODEL} SET ?
    `,
    { id, user_id: userId, cost }
  ).then(async (err, rows) => {
    if (err) {
      throw new Error(`${MODEL}.create: ${err}`);
    }
    const r = await row;
    console.log(r);
  });
};

const createTable = `
        CREATE TABLE IF NOT EXISTS ${MODEL}
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            created_at DATETIME,
            updated_at DATETIME,
            cost FLOAT,
            title VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;

module.exports = {
  create,
  createTable
};
