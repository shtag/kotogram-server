import { hash } from 'bcrypt';
import data from '../data.js';
import saveData from '../server-mongo.js';
import { app, users } from '../server.js';

let posts = data.posts;

const getUser = (req, res) => {
    let user;
    if (req.body.id) {
        user = users.find((user) => user.id === Number(req.body.id));
    } else if (req.body.username) {
        user = users.find((user) => user.username === req.body.username);
    }
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send();
    }
};

const deleteUser = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    let id;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === +req.params.id) {
            id = i;
        }
    }
    if (id !== undefined && user) {
        for (let i = 0; i < users.length; i++) {
            const ind = users[i].subscriptions.indexOf(user.id);
            if (ind >= 0) {
                users[i].subscriptions.splice(ind, 1);
            }
        }
        const filtredPosts = posts.filter((pos) => pos.author !== user.id);
        data.posts = filtredPosts;
        for (let i = 0; i < data.posts.length; i++) {
            const indOflike = data.posts[i].likes.indexOf(user.id);
            if (indOflike >= 0) {
                data.posts[i].likes.splice(indOflike, 1);
            }
            const comments = data.posts[i].comments.filter((com) => com.author !== user.id);
            data.posts[i].comments = comments;
            for (let j = 0; j < data.posts[i].comments.length; j++) {
                const indOflikeCom = data.posts[i].comments[j].likes.indexOf(user.id);
                if (indOflikeCom >= 0) {
                    data.posts[i].comments[j].likes.splice(indOflikeCom, 1);
                }
            }
        }
        users.splice(id, 1);
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send('success');
    } else {
        res.status(404).send();
    }
};

const changeLogin = async (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user) {
        if (user.sessions.includes(req.body.sessionId)) {
            if (!users.find((i) => i.username === req.body.username)) {
                if (req.body.username) {
                    user.username = req.body.username;
                }
                if (req.body.password) {
                    user.password = await hash(req.body.password, 10);
                }
                const dataCopy = JSON.parse(JSON.stringify(data));
                saveData(JSON.stringify(dataCopy));
                res.status(200).send({ username: user.username });
            } else {
                res.status(403).send('username already exist');
            }
        } else {
            res.status(400).send('wrong sessionId');
        }
    } else {
        res.status(404).send();
    }
};

const changeSettings = (req, res) => {
    const user = users.find((user) => user.id === Number(req.params.id));
    if (user && user.sessions.includes(req.body.sessionId)) {
        const settings = req.body.settings;
        if (settings.photo) {
            user.settings.photo = settings.photo;
            if (settings.photo === '') {
                user.settings.photo = 'https://i.postimg.cc/6pjZSpW8/base.jpg';
            }
        }
        if (settings.language) user.settings.language = settings.language;
        if (settings.name) user.settings.name = settings.name;
        if (settings.descriptionProfile) {
            user.settings.descriptionProfile = settings.descriptionProfile;
            const dataCopy = JSON.parse(JSON.stringify(data));
            saveData(JSON.stringify(dataCopy));
            res.status(200).send();
        }
    } else {
        res.status(404).send();
    }
};

const subscribe = (req, res) => {
    const user = users.find((el) => el.sessions.includes(req.body.sessionId));
    const userToSub = users.find((el) => el.username === req.body.username);
    if (user && userToSub) {
        if (user.subscriptions.includes(userToSub.id)) {
            const id = user.subscriptions.indexOf(userToSub.id);
            user.subscriptions.splice(id, 1);
        } else {
            user.subscriptions.push(userToSub.id);
        }
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(user);
    } else {
        res.status(404).send();
    }
};

const getSubs = (req, res) => {
    const user = users.find((el) => el.id === +req.params.id);
    if (user) {
        const subs = users.filter((us) => user.subscriptions.includes(us.id));
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(subs);
    } else {
        res.status(404).send('User not found');
    }
};

const getFollowers = (req, res) => {
    const user = users.find((el) => el.id === +req.params.id);
    if (user) {
        const followers = users.filter((us) => us.subscriptions.includes(user.id));
        res.status(200).send(followers);
    } else {
        res.status(404).send('User not found');
    }
};

const getUserList = (req, res) => {
    const list = req.body.list;
    if (list) {
        const userList = users.filter((user) => list.includes(user.username));
        res.status(200).send(userList);
    } else {
        res.status(404).send('User not found');
    }
};

const getUserListId = (req, res) => {
    const list = req.body.list;
    if (list) {
        const userList = users.filter((user) => list.includes(user.id));
        res.status(200).send(userList);
    } else {
        res.status(404).send('User not found');
    }
};

const getFavorites = (req, res) => {
    const favUser = users.find((us) => us.id === Number(req.params.id));
    if (favUser) {
        const favList = posts.filter((post) => favUser.favorites.includes(post.id));
        res.status(200).send(favList);
    } else {
        res.status(404).send('User not found');
    }
};

export {
    getUser,
    deleteUser,
    changeLogin,
    changeSettings,
    subscribe,
    getFollowers,
    getSubs,
    getUserList,
    getUserListId,
    getFavorites,
};
