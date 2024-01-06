import userService from "../service/userService";

const handleHelloWorld = (req, res) => {
    const name = "Hai Yen";
    return res.render("home.ejs", {name});
}

const handleUserPage = async (req, res) => {
    // model => get data from database
    let userList = await userService.getUserList();
    // console.log("Check userList: ", userList);
    return res.render("user.ejs", {userList});
}

const handleCreateNewUser = (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    userService.createNewUser(email, username, password);

    return res.send("New!!!");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}