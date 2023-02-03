import { compare, genSalt, hash } from "bcrypt";
import Post from "./post.js";

const data = {
    maxId: 2,
    users: [ 
        {
            id: 1,
            name: 'shtag',
            password: await hash('shtag',10),
            profilePosts: [
                new Post('https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'),
                new Post('https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg'),
                new Post('https://www.humanesociety.org/sites/default/files/2022-08/hl-yp-cats-579652.jpg'),
                new Post('http://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg'),
            ],
            subscript: [],
            followers: [],
            sessions: ["$2b$10$NhL.XLXwthdA4kACTPIJg."]
        }
    ],
    posts: [
        {
            image: 'url',
            description: 'Nice cat'
        }
    ]
}

export default data;

