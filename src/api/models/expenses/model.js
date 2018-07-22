const db = require('../../../db');

const MODEL = 'expenses';

exports.create = async ({ userId, name, cost }) => {
  try {
    const now = new Date();
    return await db.query(`INSERT INTO ${MODEL} SET ?`, {
      user_id: userId,
      name,
      cost,
      created_at: now,
      updated_at: now
    });
  } catch (err) {
    throw new Error(`${MODEL}.create: ${err}`);
  }
};

exports.getOne = async ({ id }) => {
  try {
    const rows = await db.query(`SELECT * FROM ${MODEL} WHERE ID = ? ;`, [id]);
    return rows[0];
  } catch (err) {
    throw new Error(`${MODEL}.getOne: ${err}`);
  }
};

exports.getAllByUser = async ({ userId }) => {
  try {
    const rows = await db.query(`SELECT * FROM ${MODEL} WHERE ? ;`, {
      user_id: userId
    });
    return rows;
  } catch (err) {
    throw new Error(`${MODEL}.getAll: ${err}`);
  }
};

exports.updateOne = async ({ id, name, cost }) => {
  const updateSet = {};

  name ? (updateSet.name = name) : null;
  cost ? (updateSet.cost = cost) : null;
  updateSet.updated_at = new Date();

  try {
    await db.query(`UPDATE ${MODEL} SET ? WHERE ?`, [updateSet, { id }]);
    const rows = await db.query(`SELECT * FROM ${MODEL} WHERE ?`, {
      id
    });
    return rows[0];
  } catch (err) {
    throw new Error(`${MODEL}.updateOne: ${err}`);
  }
};

exports.deleteOne = async ({ id }) => {
  try {
    const rows = await db.query(`DELETE FROM ${MODEL} WHERE ?`, { id });
    return true;
  } catch (err) {
    throw new Error(`${MODEL}.deleteOne: ${err}`);
  }
};

exports.createTable = `
        CREATE TABLE IF NOT EXISTS ${MODEL}
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            created_at DATETIME,
            updated_at DATETIME,
            cost FLOAT,
            name VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;
