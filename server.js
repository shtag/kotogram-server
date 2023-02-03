import Express from 'express';
import User from './user.js';
import data from './data.js';
import './components/auth.js';
import { login, isSessionActive, signup, logout } from './components/auth.js';

export const app = Express();
app.use(Express.json())

export const users = data.users;


app.get('/', (req, res) => res.json(data));
// auth requests
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);
app.post('/user/session', isSessionActive);

// get list of users
app.get('/users', (req, res) => res.json(users));

//get user with name
app.get('/users/:name', (req, res) => {
    const name = req.params.name;
    console.log(name);
    const user = users.find(user => user.name === name)
    if (user) {
        res.status(200).json(user).send();
    } else {
        res.status(404).send()
    }
})
//get user with id
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    const user = users.find(user => user.id === +id)
    if (user) {
        res.status(200).json(user).send();
    } else {
        res.status(404).send()
    }
})





app.listen(3000);