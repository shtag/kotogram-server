import data from '../data.js';

const search = (req, res) => {
    const query = req.body.query.toLowerCase();
    const users = data.users.filter((user) => user.username.toLowerCase().includes(query));
    const posts = data.posts.filter((post) => post.description.toLowerCase().includes(query));
    if (users || posts) {
        res.status(200).json({ users: users, posts: posts }).send();
    } else {
        res.status(404).send();
    }
};

export { search };
