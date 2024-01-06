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

const createNewUser = (email, username, password) => {
    let hashPassword = hashUserPassword(password);

    connection.query(
        'INSERT INTO users (email, username, password) VALUES (?,?,?)', [email, username, hashPassword],
        function(err, results, fields) {
            if (err) console.log(err);
            // console.log(results); // results contains rows returned by server
        }
    );
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

    let users = [];
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

module.exports = {
    createNewUser, getUserList
}