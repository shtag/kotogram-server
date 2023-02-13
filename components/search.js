import data from '../data.js';

const search = (req, res) => {
    const query = req.body.query;
    const users = data.users.filter((user) => user.username.includes(query));
    const posts = data.posts.filter((post) => post.description.includes(query));
    console.log(users);
    if (users) {
        res.status(200).json({ users: users, posts: posts }).send();
    } else {
        res.status(404).send();
    }
};

export { search };
