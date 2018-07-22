const db = require('../../../db');

const MODEL = 'tags';

exports.create = async ({ userId, name, color }) => {
  try {
    const now = new Date();
    return await db.query(`INSERT INTO ${MODEL} SET ?`, {
      user_id: userId,
      name,
      color,
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

exports.updateOne = async ({ id, userId, name, color }) => {
  const updateSet = {};

  userId ? (updateSet.user_id = userId) : null;
  name ? (updateSet.name = name) : null;
  color ? (updateSet.color = color) : null;

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
            color VARCHAR(100),
            name VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
    `;

// ADD INDEDES FOR user_id, id
