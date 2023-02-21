import { hash } from 'bcrypt';
import data from './data.js';

class User {
    constructor(name, password) {
        this.id = User.maxUserId;
        this.username = name;
        this.password = password;
        this.profilePosts = [];
        User.maxUserId++;
        this.subscriptions = [];
        this.sessions = [];
        this.favorites = [];
        this.settings = {
            photo: 'https://i.postimg.cc/6pjZSpW8/base.jpg',
            language: 'en',
            name: name,
            descriptionProfile: '',
        };
    }

    static maxUserId = 2;
    get followers() {
        const users = data.users;
        const followers = users.filter((user) => user.followers.includes(this.name));
        return followers;
    }
}

data.users.push(new User('shtag3', await hash('hstag', 10)));
data.users.push(new User('shtag4', await hash('hstag', 10)));
data.users[2].subscriptions.push(1);
data.users[3].subscriptions.push(1);
data.users[1].subscriptions.push(1);

export default User;
