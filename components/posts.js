import Post from '../post.js';
import { users } from '../server.js';
import data from '../data.js';
import Comment from '../comment.js';

const posts = data.posts;



const newPost = (req, res) => {
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    if (user) {
        const post = new Post(req.body.image, req.body.description, user.username);
        posts.push(post);
        res.status(200).json(post).send();
    } else {
        res.status(404).send();
    }
};

const like = (req, res) => {
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    const post = posts.find(post => post.id === +req.params.id);
    if (user && post) {
        const id = post.likes.indexOf(user.username);
        if(id >= 0) {
            post.likes.splice(id, 1);
        } else {
            post.likes.push(user.username);
        }
        res.status(200).json(post).send();
    } else {
        res.status(404).send('Post not found');
    }
};

const addComment = (req, res) => {
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    const post = posts.find(post => post.id === +req.params.postId);
    if (user && post) {
        const comment = new Comment(req.body.text, user.username, post.comments.length + 1)
        post.comments.push(comment);
        res.status(200).json(post).send();
    } else {
        res.status(404).send('Post not found');
    }
};

const removeComment = (req, res) => {
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    const post = posts.find(post => post.id === +req.params.postId);
    if (user && post) {
        const id = +req.body.commentId;
        post.comments.splice(id - 1, 1);
        res.status(200).json(post).send();
    } else {
        res.status(404).send('Post not found');
    }
};
const getPost =  (req, res) => {
    const post = posts.find(post => post.id === +req.params.id);
    if (post) {
        res.status(200).json(post).send();
    } else {
        res.status(404).send('Post not found');
    }
};

const likeComment =  (req, res) => {
    const post = posts.find(post => post.id === +req.params.id);
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    console.log(user)
    const comment = post.comments.find(el => el.id === +req.body.commentId);
    console.log(post)
    console.log(comment)
    if (post) {
        const id = comment.likes.indexOf(user.username);
        console.log(id);
        if(id >= 0) {
            comment.likes.splice(id - 1, 1);
        } else {
            comment.likes.push(user.username);
        }
        res.status(200).json(post).send();
    } else {
        res.status(404).send('Post not found');
    }
};

const getFeed = (req, res) => {
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    const from = req.body.limit * req.body.page - req.body.limit;
    const to = req.body.limit * req.body.page;
    const feed = posts.filter(post => user.subscriptions.includes(post.author)).sort((a,b) => b.id - a.id).splice(from, to)
    if (feed) {
        res.status(200).json(feed).send();
    } else {
        res.status(404).send('Feed not found');
    }
}
const getRecomendation = (req, res) => {
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    const from = req.body.limit * req.body.page - req.body.limit;
    const to = req.body.limit * req.body.page;
    const feed = posts.sort((a,b) => Math.random() - Math.random()).sort((a,b) => b.id - a.id).splice(from, to)
    if (feed) {
        res.status(200).json(feed).send();
    } else {
        res.status(404).send('Feed not found');
    }
}

export { newPost, like, addComment, removeComment, getPost, likeComment, getFeed, getRecomendation };