import './server-mongo.js';
import Express from 'express';
import User from './user.js';
import data from './data.js';
import './components/auth.js';
import { login, isSessionActive, signup, logout } from './components/auth.js';
import {
    changeLogin,
    changeSettings,
    deleteUser,
    getFavorites,
    getFollowers,
    getSubs,
    getUser,
    getUserList,
    getUserListId,
    subscribe,
} from './components/users.js';
import {
    addComment,
    addFavorites,
    getFeed,
    getPost,
    getRecomendation,
    getUserPosts,
    like,
    likeComment,
    newPost,
    removeComment,
    removePost,
} from './components/posts.js';
import { search } from './components/search.js';

export const app = Express();
app.use(Express.json());

import cors from 'cors';

const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

export const users = data.users;

app.get('/', (req, res) => res.json(data));

// auth requests
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);
app.post('/user/session', isSessionActive);

// get list of users
app.get('/users', (req, res) => res.json(users));
//get user with name or id
app.post('/user', getUser);
app.delete('/user/:id', deleteUser);
app.patch('/user/:id', changeLogin);
app.patch('/user/settings/:id', changeSettings);

app.post('/post', newPost);
app.delete('/post/:postId', removePost);
app.post('/like/:id', like);
app.post('/comment/:postId', addComment);
app.delete('/comment/:postId', removeComment);

app.get('/post', (req, res) => res.json(data.posts));
app.post('/feed', getFeed);
app.post('/recomendation', getRecomendation);
app.get('/post/:id', getPost);
app.get('/userposts/:id', getUserPosts);
app.patch('/post/:id', likeComment);
app.post('/favorites/add', addFavorites);
app.get('/favorites/:id', getFavorites);

app.post('/search', search);

app.post('/subscribe', subscribe);
app.get('/subscriptions/:id', getSubs);
app.get('/followers/:id', getFollowers);
app.post('/userlist', getUserList);
app.post('/userlistid', getUserListId);

app.listen(3000, '0.0.0.0');
