const db = require('../../../db');

const MODEL = 'users';

exports.create = async ({ id, email, authProvider }) => {
  try {
    const now = new Date();
    return await db.query(`INSERT INTO ${MODEL} SET ?`, {
      email,
      auth_provider: authProvider,
      created_at: now,
      updated_at: now
    });
  } catch (err) {
    throw new Error(`${MODEL}.create: ${err}`);
  }
};

exports.getOne = async ({ id }) => {
  try {
    const rows = await db.query(`SELECT * FROM ${MODEL} WHERE ID = ?`, [id]);

    if (rows.length === 0) {
      throw new Error(`No user for id: ${id}`);
    } else {
      return rows[0];
    }
  } catch (err) {
    throw new Error(`${MODEL}.getOne ${err}`);
  }
};

exports.getAll = async () => {
  try {
    const rows = await db.query(`SELECT * FROM ${MODEL};`, null);
    return rows;
  } catch (err) {
    throw new Error(`${MODEL}.getAll ${err}`);
  }
};

exports.updateOne = async ({ id, email, authProvider }) => {
  const updateSet = {};

  id ? (updateSet.id = id) : null;
  email ? (updateSet.email = email) : null;
  authProvider ? (updateSet.auth_provider = authProvider) : null;
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
            email VARCHAR(255),
            created_at DATETIME,
            updated_at DATETIME,
            auth_provider VARCHAR(30)
        );
    `;
