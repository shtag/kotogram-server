import { compare, genSalt, hash } from 'bcrypt';
import Post from './post.js';
import User from './user.js';

let data = {
    users: [
        {
            id: 1,
            username: 'shtag',
            password: await hash('shtag', 10),
            subscriptions: [2,3], // тут в массиве не строки а числа
            sessions: ['$2b$10$NhL.XLXwthdA4kACTPIJg.'],
            settings: {
                photo: 'https://i.postimg.cc/pVQbx4hN/profile-img.jpg',
                language: 'en',
                name: 'Vasyl',
                descriptionProfile:'I am a nice cat!'
            }
        },
        {
            id: 2,
            username: "shtag2",
            password: "$2b$10$.84C8oCoFv3AE93TQ6yWJOo7fZu1B5.i1lTXeXwveRHL8fd/f0Q.e",
            profilePosts: [],
            subscriptions: [3],
            sessions: [
                "$2b$10$S.BU8bkwGg5vsZZ5IHIv3e"
            ],
            settings: {
                photo: "",
                language: "en",
                name: "shtag2",
                descriptionProfile: ""
            }
        },
    ],
    posts: [
        {
            "id": 1,
            "image": "https://i.postimg.cc/90sJyWzX/old-home.jpg",
            "description": "Here is my old apartment",
            "date": 1000167089287,
            "likes": [],// тут массив id лайкнувших 
            "comments": [],
            "author": 1 // тут id автора
        },
        {
            "id": 2,
            "image": "https://i.postimg.cc/C11NtZqL/traveler.jpg",
            "description": "It's me on a train, I like traveling...",
            "date": 1235967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 3,
            "image": "https://i.postimg.cc/vmXh37DN/sleep.jpg",
            "description": "Was working and fell asleap",
            "date": 1345967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 4,
            "image": "https://i.postimg.cc/BZzhrCNW/playful-mood.jpg",
            "description": "Have some playful mood",
            "date": 1432967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 5,
            "image": "https://i.postimg.cc/Mp7djJwx/photo-2023-02-09-20-23-42.jpg",
            "description": "Bring my human for a little walk",
            "date": 1543967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 6,
            "image": "https://i.postimg.cc/CxTc1LWm/My-buds.jpg",
            "description": "Invite buds for a meal",
            "date": 1567967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 7,
            "image": "https://i.postimg.cc/7h5KCCHQ/meet-some-gangsters.jpg",
            "description": "Meet dangerous gangsters..",
            "date": 1598967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 8,
            "image": "https://i.postimg.cc/9M8xFPh7/bright-future.jpg",
            "description": "Looking in bright future",
            "date": 1623967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 9,
            "image": "https://i.postimg.cc/VLb7mbHJ/i-was-sleeps-now-im-not.jpg",
            "description": "I was sleeping, now I am not",
            "date": 1646967689287,
            "likes": [],
            "comments": [],
            "author": 1
        },
        {
            "id": 10,
            "image": "https://i.postimg.cc/GpbzFg3D/chick.jpg",
            "description": "Look at this chick",
            "date": 1675967689288,
            "likes": [],
            "comments": [],
            "author": 1
        }
    ],
};


for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        data.posts.push(new Post('someUrl3', 'here is description3 shta', 2))
    }, 100)
}
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        data.posts.push(new Post(`someUrl${i}`, `here is description №${i}`, 3))
    }, 300)
}

export default data;
