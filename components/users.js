import { app, users } from '../server.js';

const getUser = (req, res) => {
    let user;
    if (req.body.id) {
        user = users.find((user) => user.id === Number(req.body.id));
    } else if (req.body.username) {
        user = users.find((user) => user.username === req.body.username);
    }
    if (user) {
        res.status(200).json(user).send();
    } else {
        res.status(404).send();
    }
};

const deleteUser = (req, res) => {
    let id;
    for (let i = 0; i < users.length; i++) {
        if(users[i].id === +req.params.id) {
            id = i;
        }
    }
    if (id !== undefined && users[id].sessions.includes(req.body.sessionId)) {
        users.splice(id, 1);
        res.status(200).send();
    } else {
        res.status(404).send();
    }
};



const changeLogin = (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        if (user.sessions.includes(req.body.sessionId)) {
            if (req.body.username) {
            user.username = req.body.username
        }
        if (req.body.password) {
            user.password = req.body.password;
        }
        res.status(200).json({"username":user.username}).send();
        } else {
            res.status(400).send("wrong sessionId");
        }
        
    } else {
        res.status(404).send();
    }
};

const changeSettings = (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user && user.sessions.includes(req.body.sessionId)) {
        const settings = req.body.settings;
        if(settings.photo) user.settings.photo = settings.photo;
        if(settings.language) user.settings.language = settings.language;
        if(settings.name) user.settings.name = settings.name;
        if(settings.descriptionProfile) user.settings.descriptionProfile = settings.descriptionProfile;
        res.status(200).send();
    } else {
        res.status(404).send();
    }
};

const subscribe = (req, res) => {
    const user = users.find(el => el.sessions.includes(req.body.sessionId));
    const userToSub = users.find(el => el.username === req.body.username)
    if (user && userToSub) {
        if(user.subscriptions.includes(userToSub.username)) {
            const id = user.subscriptions.indexOf(userToSub.username);
            user.subscriptions.splice(id, 1);
        } else {
            user.subscriptions.push(userToSub.username)
        }
        res.status(200).json(user).send();
    } else {
        res.status(404).send();
    }
};

const getSubs = (req, res) => {
    const user = users.find(el => el.id === +req.params.id);
    console.log(req.params.id)
    if (user) {
        const subs = users.filter(us => user.subscriptions.includes(us.username));
        res.status(200).json(subs).send();
    } else {
        res.status(404).send("User not found");
    }
};

const getFollowers = (req, res) => {
    const user = users.find(el => el.id === +req.params.id);
    if (user) {
        const followers = users.filter(us => us.subscriptions.includes(user.username));
        res.status(200).json(followers).send();
    } else {
        res.status(404).send("User not found");
    }
};

const getUserList = (req, res) => {
    const list = req.body.list;
    if (list) {
        const userList = users.filter(user => list.includes(user.username));
        res.status(200).json(userList).send();
    } else {
        res.status(404).send("User not found"); 
    }
};


export { getUser, deleteUser, changeLogin, changeSettings, subscribe, getFollowers, getSubs, getUserList };
