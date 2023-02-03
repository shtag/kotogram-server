import data from "./data.js";

class User{
    constructor(name, password) {
        this.name = name;
        this.password = password;
        this.profilePosts = [];
        this.id = data.maxId;
        data.maxId++;
        this.subscript = [];
        this.followers = [];
        this.sessions = [];
    }
}

export default User;