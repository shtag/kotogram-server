import Express from 'express';
import User from './user.js';
import data from './data.js';

const app = Express();
app.use(Express.json())


const users = data.users;

// get list of users
app.get('/users', (req, res) => {
    res.json(users);
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

app.post('/signup', async (req, res) => {
    if (!users.find(el => el.login === req.body.login)) {
        const user = new User(req.body.login, req.body.password)
        data.users.push(user);
        res.status(200).json(users).send();
    } else {
        res.statusMessage = 'Login already taken';
        res.status(400).send();
    }
})


app.listen(3000);