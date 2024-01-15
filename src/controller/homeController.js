import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
  const name = "Hai Yen";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  // model => get data from database
  let userList = await userService.getUserList();
  // console.log("Check userList: ", userList);
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  userService.createNewUser(email, username, password);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  console.log(req.params.id);
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = {};
  userData = user;
  // if (user && user.length > 0) {
  //     userData = user[0];
  // }
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;
  console.log(req.body);
  await userService.updateUserInfo(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
