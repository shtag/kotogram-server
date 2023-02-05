import Express from 'express';
import User from './user.js';
import data from './data.js';
import './components/auth.js';
import { login, isSessionActive, signup, logout } from './components/auth.js';
import { changeLogin, changeSettings, deleteUser, getFollowers, getSubs, getUser, getUserList, subscribe } from './components/users.js';
import { addComment, getFeed, getPost, getRecomendation, like, likeComment, newPost, removeComment } from './components/posts.js';
import { search } from './components/search.js';

export const app = Express();
app.use(Express.json());

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
app.post('/like/:id', like);
app.post('/comment/:postId', addComment);
app.delete('/comment/:postId', removeComment);

app.get('/post', (req, res) => res.json(data.posts));
app.get('/feed', getFeed);
app.get('/recomendation', getRecomendation);
app.get('/post/:id', getPost);
app.patch('/post/:id', likeComment);

app.get('/search', search);


app.post('/subscribe', subscribe);
app.get('/subscriptions/:id', getSubs);
app.get('/followers/:id', getFollowers);
app.get('/userlist', getUserList);

app.listen(3000);