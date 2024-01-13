import bcrypt from "bcryptjs"
// get the client
import mysql from "mysql2/promise"
// get the promise implementation, we will use bluebird
import bluebird from "bluebird"


const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (email, username, password) => {
    let hashPassword = hashUserPassword(password);
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'haiyen@11231',
        database: 'jwt', 
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('INSERT INTO users (email, username, password) VALUES (?,?,?)',
            [email, username, hashPassword]);
        return rows;
    } catch (err) {
        console.log("Error: ", err);
    }

    // connection.query(
    //     'INSERT INTO users (email, username, password) VALUES (?,?,?)', [email, username, hashPassword],
    //     function(err, results, fields) {
    //         if (err) console.log(err);
    //         // console.log(results); // results contains rows returned by server
    //     }
    // );
}

const getUserList = async () => {
    // create the connection, specify bluebird as Promise
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'haiyen@11231',
        database: 'jwt', 
        Promise: bluebird
    });

    // let users = [];
    // return connection.query(
    //     'SELECT * FROM users',
    //     function(err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }

    //         users = results;
    //         return users;
    //         // console.log(results); // results contains rows returned by server
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.log("Error: ", err);
    }
}

const deleteUser = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'haiyen@11231',
        database: 'jwt', 
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?',
            [id]);
        return rows;
    } catch (err) {
        console.log("Error: ", err);
    }

}

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'haiyen@11231',
        database: 'jwt', 
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id = ?',
            [id]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log("Error: ", err);
    }
}

const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'haiyen@11231',
        database: 'jwt', 
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?',
            [email,, username, id]);
        console.log(rows);
        return rows;
    } catch (err) {
        console.log("Error: ", err);
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfo
}