import data from "./data.js";

class User{
    constructor(login, password) {
        this.login = login;
        this.password = password;
        this.profilePosts = [];
        this.id = data.maxId;
        data.maxId++;
        this.subscript = [];
        this.followers = [];
    }
}

export default User;