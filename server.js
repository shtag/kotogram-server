import Express from 'express';
import User from './user.js';
import data from './data.js';
import './components/auth.js';
import { login, signup } from './components/auth.js';

export const app = Express();
app.use(Express.json())

export const users = data.users;

app.post('/signup', signup);
app.post('/login', login);

// get list of users
app.get('/users', (req, res) => res.json(users));

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