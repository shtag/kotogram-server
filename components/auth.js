import { compare, genSalt, hash } from 'bcrypt';
import data from '../data.js';
import dataFile from '../dataFile.js';
import saveData from '../server-mongo.js';
import { users } from '../server.js';
import User from '../user.js';

const signup = async (req, res) => {
    if (!users.find((el) => el.username === req.body.username)) {
        const user = new User(req.body.username, await hash(req.body.password, 10));
        users.push(user);
        const response = {
            username: req.body.username,
            password: req.body.password,
        };
        const dataCopy = JSON.parse(JSON.stringify(data));
        saveData(JSON.stringify(dataCopy));
        res.status(200).send(response);
    } else {
        res.status(400).send('Login already taken');
    }
};

const login = async (req, res) => {
    const user = users.find((el) => el.username === req.body.username);
    if (user) {
        const isSame = await compare(req.body.password, user.password);
        if (isSame) {
            const sessionId = await genSalt(10);
            user.sessions.push(sessionId);
            const body = {
                username: user.username,
                sessionId: sessionId,
                id: user.id,
            };
            const dataCopy = JSON.parse(JSON.stringify(data));
            saveData(JSON.stringify(dataCopy));
            res.status(200).send(body);
        } else {
            res.status(400).send();
        }
    } else {
        res.status(404).send('User not found');
    }
};

const isSessionActive = async (req, res) => {
    const user = users.find((el) => el.id === +req.body.id);
    if (user) {
        if (user.sessions.includes(req.body.sessionId)) {
            const body = {
                sessionActive: true,
            };
            res.status(200).send(body);
        } else {
            const body = {
                sessionActive: false,
            };
            res.status(400).send(body);
        }
    } else {
        res.status(404).send('User not found');
    }
};

const logout = async (req, res) => {
    const user = users.find((el) => el.id === +req.body.id);
    if (user) {
        if (user.sessions.includes(req.body.sessionId)) {
            const id = user.sessions.indexOf(req.body.sessionId);
            user.sessions.splice(id, 1);
            const dataCopy = JSON.parse(JSON.stringify(data));
            saveData(JSON.stringify(dataCopy));
            res.status(200).send('logout');
        } else {
            res.status(400).json(body).send('Session is not active');
        }
    } else {
        res.status(404).send('User not found');
    }
};

export { signup, login, isSessionActive, logout };
