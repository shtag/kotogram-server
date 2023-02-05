import data from './data.js';

class User {
    constructor(name, password) {
        this.username = name;
        this.password = password;
        this.profilePosts = [];
        this.id = User.maxUserId;
        User.maxUserId++;
        this.subscriptions = [];
        this.sessions = [];
        this.settings = {
            photo: '',
            language: 'en',
            name: name,
            descriptionProfile:''
        }
    }

    static maxUserId = 2;
    get followers() {
        const users = data.users;
        const followers = users.filter((user) => user.followers.includes(this.name));
        return followers;
    }
}


data.users.push(new User('shtag2', 'hstag'))
data.users.push(new User('shtag3', 'hstag'))
data.users.push(new User('shtag4', 'hstag'))

export default User;
