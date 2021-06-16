require('dotenv').config();
const mysql = require('mysql2/promise');

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

let pool;

async function getConnection() {
	if (!pool) {
		pool = mysql.createPool({
			connectionLimit: 10,
			host: MYSQL_HOST,
			user: MYSQL_USER,
			password: MYSQL_PASSWORD,
			database: MYSQL_DATABASE,
			timezone: 'Z',
		});
	}

	return await pool.getConnection();
}

const insertRegistration = async (table, newRegistration) => {
	let connection;
	try {
		connection = await getConnection();
		const [result] = await connection.query(
			createInsertQuerry(table, newRegistration)
		);
		return result;
	} catch (error) {
		return error;
	} finally {
		if (connection) connection.release();
	}
};
const getRegistrations = async (tableOrQuery, searchObject) => {
	let connection;
	try {
		connection = await getConnection();
		if (searchObject)
			tableOrQuery = createSelectAllWhereQuerry(
				tableOrQuery,
				searchObject
			);
		const [results] = await connection.query(tableOrQuery);
		return results;
	} catch (error) {
		return error;
	} finally {
		if (connection) connection.release();
	}
};
const updateRegistration = async (table, id, updateObject) => {
	let connection;
	try {
		connection = await getConnection();
		const query = createUpdateQuerry(table, id, updateObject);
		console.log(query);
		await connection.query(query);
		return true;
	} catch (error) {
		return error;
	} finally {
		if (connection) connection.release();
	}
};

// ***********************
// ** QUERY GENERATORS **
// ***********************

const createSelectAllWhereQuerry = (table, searchObject) => {
	let query = `SELECT * FROM ${table} WHERE `;
	const keyWhereString = [];
	for (const key in searchObject) {
		keyWhereString.push(` ${key} = "${searchObject[key]}"`);
	}
	query += keyWhereString.join(' AND ');
	query += ' AND borrado <> 1;';
	return query;
};

const createInsertQuerry = (table, updateObject) => {
	let query = `INSERT INTO ${table} SET`;
	const keyUpdateString = [];
	for (const key in updateObject) {
		keyUpdateString.push(` ${key} = "${updateObject[key]}"`);
	}
	query += keyUpdateString.join(',');
	return query;
};
const createUpdateQuerry = (table, id, updateObject) => {
	let query = `UPDATE ${table} SET`;
	const keyUpdateString = [];
	for (const key in updateObject) {
		keyUpdateString.push(` ${key} = "${updateObject[key]}"`);
	}
	query += keyUpdateString.join(',');
	query += ` WHERE id = ${id};`;
	return query;
};

module.exports = {
	getConnection,
	getRegistrations,
	insertRegistration,
	updateRegistration,
	createSelectAllWhereQuerry,
};