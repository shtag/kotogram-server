import { compare, genSalt, hash } from 'bcrypt';
import Post from './post.js';
import User from './user.js';

let data = {
    users: [
        {
            id: 1,
            username: 'shtag',
            password: await hash('shtag', 10),
            subscriptions: [2, 3], // тут в массиве не строки а числа
            sessions: ['$2b$10$NhL.XLXwthdA4kACTPIJg.'],
            favorites: [1, 5, 7],
            settings: {
                photo: 'https://i.postimg.cc/pVQbx4hN/profile-img.jpg',
                language: 'en',
                name: 'Vasyl',
                descriptionProfile: 'I am a nice cat!',
            },
        },
        {
            id: 2,
            username: 'shtag2',
            password: '$2b$10$.84C8oCoFv3AE93TQ6yWJOo7fZu1B5.i1lTXeXwveRHL8fd/f0Q.e',
            profilePosts: [],
            subscriptions: [3],
            favorites: [1, 5, 7],
            sessions: ['$2b$10$S.BU8bkwGg5vsZZ5IHIv3e'],
            settings: {
                photo: 'https://i.pinimg.com/564x/50/72/b9/5072b947d36975e9890344aec5757700.jpg',
                language: 'en',
                name: 'shtag2',
                descriptionProfile: '',
            },
        },
    ],
    posts: [
        {
            id: 1,
            image: 'https://i.postimg.cc/90sJyWzX/old-home.jpg',
            description: 'Here is my old apartment',
            date: 1000167089287,
            likes: [], // тут массив id лайкнувших
            comments: [],
            author: 1, // тут id автора
        },
        {
            id: 2,
            image: 'https://i.postimg.cc/C11NtZqL/traveler.jpg',
            description: "It's me on a train, I like traveling...",
            date: 1235967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 3,
            image: 'https://i.postimg.cc/vmXh37DN/sleep.jpg',
            description: 'Was working and fell asleap',
            date: 1345967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 4,
            image: 'https://i.postimg.cc/BZzhrCNW/playful-mood.jpg',
            description: 'Have some playful mood',
            date: 1432967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 5,
            image: 'https://i.postimg.cc/Mp7djJwx/photo-2023-02-09-20-23-42.jpg',
            description: 'Bring my human for a little walk',
            date: 1543967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 6,
            image: 'https://i.postimg.cc/CxTc1LWm/My-buds.jpg',
            description: 'Invite buds for a meal',
            date: 1567967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 7,
            image: 'https://i.postimg.cc/7h5KCCHQ/meet-some-gangsters.jpg',
            description: 'Meet dangerous gangsters..',
            date: 1598967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 8,
            image: 'https://i.postimg.cc/9M8xFPh7/bright-future.jpg',
            description: 'Looking in bright future',
            date: 1623967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 9,
            image: 'https://i.postimg.cc/VLb7mbHJ/i-was-sleeps-now-im-not.jpg',
            description: 'I was sleeping, now I am not',
            date: 1646967689287,
            likes: [],
            comments: [],
            author: 1,
        },
        {
            id: 10,
            image: 'https://i.postimg.cc/GpbzFg3D/chick.jpg',
            description: 'Look at this chick',
            date: 1675967689288,
            likes: [],
            comments: [],
            author: 1,
        },
    ],
};
const shtag2Img = [
    'https://images.unsplash.com/photo-1571988840298-3b5301d5109b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
    'https://images.unsplash.com/photo-1579168765467-3b235f938439?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    'https://images.unsplash.com/photo-1586289883499-f11d28aaf52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1601373879104-b4290a56b691?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=670&q=80',
];
const shtag3Img = [
    'https://images.unsplash.com/photo-1597626133663-53df9633b799?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    'https://images.unsplash.com/photo-1567270671170-fdc10a5bf831?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1605450648855-63f9161b7ef7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=644&q=80',
    'https://images.unsplash.com/photo-1572171572779-e93ec53b8024?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
];
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        data.posts.push(new Post(shtag2Img[i], `It's my ${i + 1} photo`, 2));
    }, 100);
}
for (let i = 0; i < 5; i++) {
    setTimeout(() => {
        data.posts.push(new Post(shtag3Img[i], `It's my ${i + 1} photo`, 3));
    }, 300);
}

export default data;
