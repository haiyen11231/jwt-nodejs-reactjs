import bcrypt from "bcryptjs"
// get the client
import mysql from "mysql2"

const salt = bcrypt.genSaltSync(10);
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'haiyen@11231',
    database: 'jwt'
});

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

const getUserList = () => {
    let users = [];
    connection.query(
        'SELECT * FROM users',
        function(err, results, fields) {
            if (err) console.log(err);
            // console.log(results); // results contains rows returned by server
        }
    );
}

module.exports = {
    createNewUser, getUserList
}