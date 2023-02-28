import Post from '../post.js';
import { users } from '../server.js';
import data from '../data.js';
import Comment from '../comment.js';
import saveData from '../server-mongo.js';

const posts = data.posts;

const newPost = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    if (user) {
        const post = new Post(req.body.image, req.body.description, user.id);
        posts.push(post);
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(post);
    } else {
        res.status(404).send();
    }
};

const removePost = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const post = posts.find((post) => post.id === +req.params.postId);
    if (user.id === post.author) {
        const id = +req.params.postId;
        const dataCopy = JSON.parse(JSON.stringify(data));
        dataCopy.splice(id - 1, 1);
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(posts);
    } else {
        res.status(404).send('Post not found');
    }
};

const like = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const post = posts.find((post) => post.id === +req.params.id);
    if (user && post) {
        const id = post.likes.indexOf(user.id);
        if (id >= 0) {
            post.likes.splice(id, 1);
        } else {
            post.likes.push(user.id);
        }
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(post);
    } else {
        res.status(404).send('Post not found');
    }
};

const addComment = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const post = posts.find((post) => post.id === +req.params.postId);
    if (user && post) {
        const comment = new Comment(req.body.text, user.id, post.comments.length + 1);
        post.comments.push(comment);
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(post);
    } else {
        res.status(404).send('Post not found');
    }
};

const removeComment = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const post = posts.find((post) => post.id === +req.params.postId);
    if (user && post) {
        const id = +req.body.commentId;
        post.comments.splice(id - 1, 1);
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(post);
    } else {
        res.status(404).send('Post not found');
    }
};
const getPost = (req, res) => {
    const post = posts.find((post) => post.id === +req.params.id);
    if (post) {
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(post);
    } else {
        res.status(404).send('Post not found');
    }
};

const likeComment = (req, res) => {
    const post = posts.find((post) => post.id === +req.params.id);
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const comment = post.comments.find((el) => el.id === +req.body.commentId);
    if (post) {
        if (comment) {
            const id = comment.likes.indexOf(user.id);
            if (id >= 0) {
                comment.likes.splice(id - 1, 1);
            } else {
                comment.likes.push(user.id);
            }
            const dataCopy = JSON.parse(JSON.stringify(data));
            saveData(JSON.stringify(dataCopy));
            res.status(200).send(post);
        } else {
            res.status(404).send('Comment not found');
        }
    } else {
        res.status(404).send('Post not found');
    }
};

const getFeed = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const from = req.body.limit * req.body.page - req.body.limit;
    const to = req.body.limit * req.body.page;
    console.log(from, to);
    if (user) {
        const feed = posts
            .filter((post) => user.subscriptions.includes(post.author) || user.id === post.author)
            .sort((a, b) => b.id - a.id)
            .splice(from, to);
        if (feed) {
            res.status(200).send(feed);
        }
    } else {
        res.status(404).send();
    }
};
const getRecomendation = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const currPosts = [...posts].filter((item) => item.author !== user.id);
    const from = req.body.limit * req.body.page - req.body.limit;
    const to = req.body.limit * req.body.page;
    const feed = currPosts
        .sort((a, b) => Math.random() - Math.random())
        .slice(from, to)
        .sort((a, b) => b.id - a.id);
    if (feed) {
        res.status(200).send(feed);
    } else {
        res.status(404).send();
    }
};

const getUserPosts = (req, res) => {
    const user = users.find((el) => el.id === +req.params.id);
    const postList = posts.filter((po) => po.author === user.id);
    if (postList && user) {
        res.status(200).send(postList);
    } else {
        res.status(404).send();
    }
};

const addFavorites = (req, res) => {
    const postId = req.body.postId;
    const user = users.find((us) => us.sessions.includes(req.body.sessionId));
    if (user && postId) {
        const id = user.favorites.indexOf(postId);
        if (user.favorites.includes(postId)) {
            user.favorites.splice(id, 1);
        } else {
            user.favorites.push(postId);
        }
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(user.favorites);
    } else {
        res.status(404).send('User not found');
    }
};

export {
    newPost,
    like,
    addComment,
    removeComment,
    getPost,
    likeComment,
    getFeed,
    getRecomendation,
    removePost,
    getUserPosts,
    addFavorites,
};
