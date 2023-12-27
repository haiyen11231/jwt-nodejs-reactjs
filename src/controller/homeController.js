import userService from "../service/userService";

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

    userService.createNewUser(email, username, password);

    return res.send("New!!!");
}

module.exports = {
    handleHelloWorld, handleUserPage, handleCreateNewUser
}