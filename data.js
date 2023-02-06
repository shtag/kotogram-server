import { compare, genSalt, hash } from 'bcrypt';
import Post from './post.js';
import User from './user.js';

const data = {
    users: [
        {
            id: 1,
            username: 'shtag',
            password: await hash('shtag', 10),
            subscriptions: ['shtag4', 'shtag2', 'shtag3'],
            sessions: ['$2b$10$NhL.XLXwthdA4kACTPIJg.'],
            settings: {
                photo: '',
                language: 'en',
                name: 'Vasyl',
                descriptionProfile:'I am a nice cat!'
            }
        },
    ],
    posts: [],
};


data.posts.push(new Post('someUrl', 'here is description', 'shtag4'))
data.posts.push(new Post('someUrl2', 'here is description2', 'shtag3'))
data.posts.push(new Post('someUrl1', 'here is description1', 'shtag'))
data.posts.push(new Post('someUrl2', 'here is description2', 'shtag'))
data.posts.push(new Post('someUrl4', 'here is description3', 'shtag'))
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        data.posts.push(new Post('someUrl3', 'here is description3 shta', 'shtag2'))
    }, 1000)
}
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        data.posts.push(new Post(`someUrl${i}`, `here is description №${i}`, 'shtag'))
    }, 1000)
}
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        data.posts.push(new Post(`someUrl${i}`, `here is description №${i}`, 'shtag4'))
    }, 1000)
}

export default data;
