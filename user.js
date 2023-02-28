import { hash } from 'bcrypt';
import data from './data.js';

class User {
    constructor(name, password) {
        this.id = data.users[data.users.length - 1].id + 1;
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

    static maxUserId = 5;
    get followers() {
        const users = data.users;
        const followers = users.filter((user) => user.followers.includes(this.name));
        return followers;
    }
}

export default User;
