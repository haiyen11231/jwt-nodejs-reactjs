// get the client
import mysql from "mysql2"

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'haiyen@11231',
  database: 'jwt'
});


const handleHelloWorld = (req, res) => {
    const name = "Hai Yen";
    return res.render("home.ejs", {name});
}

const handleUserPage = (req, res) => {
    return res.render("user.ejs");
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    // simple query
    connection.query(
        'INSERT INTO users (email, username, password) VALUES (?,?,?)', [email, username, password],
        function(err, results, fields) {
            if (err) console.log(err);
            console.log(results); // results contains rows returned by server
        }
  );
  

    return res.send("New!!!");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}