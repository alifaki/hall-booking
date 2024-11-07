const db = require('../config/db');

const executeQuery = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getAll = (tableName) => {
    const sql = `SELECT * FROM ${tableName}`;
    return executeQuery(sql);
};

const getById = (tableName, idColumn, idValue) => {
    const sql = `SELECT * FROM ${tableName} WHERE ${idColumn} = ?`;
    return executeQuery(sql, [idValue])
        .then(results => results[0])
        .catch(err => {
            throw err;
        });
};

const create = (tableName, data) => {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map(() => '?').join(', ');
    const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
    return executeQuery(sql, values)
        .then(results => results.insertId)
        .catch(err => {
            throw err;
        });
};

const update = (tableName, idColumn, idValue, data) => {
    const updateValues = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);
    const sql = `UPDATE ${tableName} SET ${updateValues} WHERE ${idColumn} = ?`;
    return executeQuery(sql, [...values, idValue])
        .then(results => results.affectedRows > 0)
        .catch(err => {
            throw err;
        });
};

const remove = (tableName, idColumn, idValue) => {
    const sql = `DELETE FROM ${tableName} WHERE ${idColumn} = ?`;
    return executeQuery(sql, [idValue])
        .then(results => results.affectedRows > 0)
        .catch(err => {
            throw err;
        });
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    executeQuery
};