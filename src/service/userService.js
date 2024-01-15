import bcrypt from "bcryptjs";
// get the client
import mysql from "mysql2/promise";
// get the promise implementation, we will use bluebird
import bluebird from "bluebird";
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, username, password) => {
  let hashPassword = hashUserPassword(password);
  // create the connection, specify bluebird as Promise
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "haiyen@11231",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  try {
    // const [rows, fields] = await connection.execute(
    //   "INSERT INTO user (email, username, password, createdAt, updatedAt) VALUES (?,?,?,?,?)",
    //   [email, username, hashPassword, new Date(), new Date()]
    // );
    // return rows;
    await db.User.create({
      email: email,
      username: username,
      password: hashPassword,
    });
  } catch (err) {
    console.log("Error: ", err);
  }

  // connection.query(
  //     'INSERT INTO user (email, username, password) VALUES (?,?,?)', [email, username, hashPassword],
  //     function(err, results, fields) {
  //         if (err) console.log(err);
  //         // console.log(results); // results contains rows returned by server
  //     }
  // );
};

const getUserList = async () => {
  let users = [];
  users = await db.User.findAll();
  return users;

  // create the connection, specify bluebird as Promise
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "haiyen@11231",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // let user = [];
  // return connection.query(
  //     'SELECT * FROM user',
  //     function(err, results, fields) {
  //         if (err) {
  //             console.log(err);
  //             return user;
  //         }
  //         user = results;
  //         return user;
  //         // console.log(results); // results contains rows returned by server
  //     }
  // );
  // try {
  //   const [rows, fields] = await connection.execute("SELECT * FROM user");
  //   return rows;
  // } catch (err) {
  //   console.log("Error: ", err);
  // }
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: {
      id: userId,
    },
  });
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "haiyen@11231",
  //   database: "jwt",
  //   Promise: bluebird,
  // });
  // try {
  //   const [rows, fields] = await connection.execute(
  //     "DELETE FROM user WHERE id = ?",
  //     [id]
  //   );
  //   return rows;
  // } catch (err) {
  //   console.log("Error: ", err);
  // }
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: {
      id: id,
    },
  });
  return user.get({ plain: true });

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "haiyen@11231",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "SELECT * FROM user WHERE id = ?",
  //     [id]
  //   );
  //   console.log(rows);
  //   return rows;
  // } catch (err) {
  //   console.log("Error: ", err);
  // }
};

const updateUserInfo = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: { id: id },
    }
  );

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   password: "haiyen@11231",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute(
  //     "UPDATE user SET email = ?, username = ? WHERE id = ?",
  //     [email, , username, id]
  //   );
  //   console.log(rows);
  //   return rows;
  // } catch (err) {
  //   console.log("Error: ", err);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfo,
};
